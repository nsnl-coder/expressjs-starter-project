const userModel = require('../models/userModel')
const handlerFactory = require('./handlerFactory/handlerFactory')

// CONTROLLERS

const createUser = handlerFactory.createOne(userModel)
const updateUser = handlerFactory.updateOne(userModel)
const deleteUser = handlerFactory.deleteOne(userModel)
const getUser = handlerFactory.getOne(userModel)

// END OF CONTROLLERS

const userController = { createUser, updateUser, deleteUser, getUser }
module.exports = userController
