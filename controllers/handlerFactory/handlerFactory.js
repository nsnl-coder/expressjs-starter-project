const catchAsync = require('./../../utils/catchAsync')
const AppError = require('./../../utils/appError')
const APIFeatures = require('../../utils/apiFeautures')
const responseWithData = require('../../utils/responseWithData')

const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body)
    responseWithData(res, doc, 201)
  })

const getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id)
    const doc = await query
    if (!doc) {
      return next(new AppError('No document found with that ID', 404))
    }

    responseWithData(res, doc, 200)
  })

const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!doc) {
      return next(new AppError('No document found with that ID', 404))
    }

    responseWithData(res, doc, 200)
  })

const updateMany = (Model) =>
  catchAsync(async (req, res, next) => {
    const { updateList, ...data } = req.body
    const { modifiedCount } = await Model.updateMany(
      { _id: { $in: updateList } },
      data,
      {
        runValidators: true,
      }
    )
    res.status(200).json({
      status: 'success',
      modifiedCount,
    })
  })

const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)

    if (!doc) {
      return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
      status: 'success',
    })
  })

const deleteMany = (Model) =>
  catchAsync(async (req, res, next) => {
    const { deletedCount } = await Model.deleteMany({
      _id: { $in: req.body.deleteList },
    })
    res.status(200).json({
      status: 'success',
      deletedCount,
    })
  })

const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {}
    if (req.params.tourId) filter = { tour: req.params.tourId }

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()

    const docs = await features.query

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        data: docs,
      },
    })
  })

const handlerFactory = {
  createOne,
  updateOne,
  getOne,
  deleteOne,
  getAll,
  deleteMany,
  updateMany,
}
module.exports = handlerFactory
