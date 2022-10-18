const express = require('express')
const userController = require('../controllers/userController')

const Router = express.Router()

Router.route('/')
  .post(userController.createUser)
  .delete(userController.deleteManyUser)
  .get(userController.getAllUsers)
  .put(userController.updateManyUsers)

Router.route('/:id')
  .put(userController.updateUser)
  .delete(userController.deleteUser)
  .get(userController.getUser)

module.exports = Router
