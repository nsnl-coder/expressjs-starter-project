const userModel = require('../models/userModel')
const handlerFactory = require('./handlerFactory/handlerFactory')

// CONTROLLERS

const createUser = handlerFactory.createOne(userModel)
const updateUser = handlerFactory.updateOne(userModel)
const updateManyUsers = handlerFactory.updateMany(userModel)
const getUser = handlerFactory.getOne(userModel)
const getAllUsers = handlerFactory.getAll(userModel)
const deleteUser = handlerFactory.deleteOne(userModel)
const deleteManyUser = handlerFactory.deleteMany(userModel)

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
