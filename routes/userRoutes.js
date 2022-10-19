const express = require('express')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const addUserIdToParams = require('../middleware/addUserIdToParams')
const routeProtect = require('../middleware/routeProtect')
const validateUser = require('../validation/user/validateUser')

const Router = express.Router()

// auth route
Router.post('/login', authController.login)
Router.post('/', validateUser.onCreate, authController.createUser)

Router.post('/forgotPassword', authController.forgotPassword)
Router.patch('/resetPassword/:token', authController.resetPassword)

// protected routed
Router.use(routeProtect)
Router.route('/')
  .delete(userController.deleteManyUser)
  .get(userController.getAllUsers)
  .put(userController.updateManyUsers)

// Router.use(addUserIdToParams)
Router.route('/profile')
  .patch(addUserIdToParams, validateUser.onUpdate, userController.updateUser)
  .get(addUserIdToParams, userController.getUser)
  .delete(addUserIdToParams, userController.deleteUser)

module.exports = Router
