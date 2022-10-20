const express = require('express')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const addUserIdToParams = require('../middleware/addUserIdToParams')
const routeProtect = require('../middleware/routeProtect')
const routeRestriction = require('../middleware/routeRestriction')
const validateUser = require('../validation/user/index')

const Router = express.Router()

// auth route
Router.post('/login', validateUser.onLogin, authController.login)
Router.post('/', validateUser.onCreate, authController.createUser)

Router.post('/forgotPassword', authController.forgotPassword)
Router.patch('/resetPassword/:token', authController.resetPassword)

// protected routed
Router.use(routeProtect)

Router.patch('/updatePassword', authController.updatePassword)
Router.route('/profile')
  .patch(addUserIdToParams, validateUser.onUpdate, userController.updateUser)
  .get(addUserIdToParams, userController.getUser)
  .delete(addUserIdToParams, userController.deleteUser)

// restrict role to admin
Router.use(routeRestriction('admin', 'ahah'))
Router.route('/')
  .delete(userController.deleteManyUser)
  .get(userController.getAllUsers)
  .put(userController.updateManyUsers)
module.exports = Router
