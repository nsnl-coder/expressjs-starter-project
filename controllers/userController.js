const userModel = require('../models/userModel')
const responseWithData = require('../utils/responseWithData')
const handlerFactory = require('./handlerFactory/handlerFactory')

// CONTROLLERS

const createUser = handlerFactory.createOne(userModel)
const updateManyUsers = handlerFactory.updateMany(userModel)
const getAllUsers = handlerFactory.getAll(userModel)
const deleteManyUser = handlerFactory.deleteMany(userModel)

// const getUser = (req, res, next) => {
//   responseWithData(res, req.user, 200)
// }

const getUser = handlerFactory.getOne(userModel)
const updateUser = handlerFactory.updateOne(userModel)
const deleteUser = handlerFactory.deleteOne(userModel)

// END OF CONTROLLERS

const userController = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  deleteManyUser,
  getAllUsers,
  updateManyUsers,
}

module.exports = userController
