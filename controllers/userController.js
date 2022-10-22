const userModel = require('../models/user')
const handlerFactory = require('./handlerFactory/handlerFactory')

// remove unwanted data from user
const sanitizeData = (req, res, next) => {
  // 1) Sanitize unwanted data
  const {
    role,
    passwordChangedAt,
    passwordResetToken,
    passwordResetTokenExpires,
    isVerified,
    ...sanitizeData
  } = req.body
  req.body = sanitizeData
  next()
}

// CONTROLLERS
const createUser = handlerFactory.createOne(userModel)
const updateManyUsers = handlerFactory.updateMany(userModel)
const getAllUsers = handlerFactory.getAll(userModel)
const deleteManyUser = handlerFactory.deleteMany(userModel)

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
  sanitizeData,
}

module.exports = userController
