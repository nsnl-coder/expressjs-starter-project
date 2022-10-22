const express = require('express')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const addUserIdToParams = require('../middleware/addUserIdToParams')
const routeProtect = require('../middleware/routeProtect')
const routeRestriction = require('../middleware/routeRestriction')

const Router = express.Router()

// sanitize the data from user
Router.use(userController.sanitizeData)

// not loggedin user router
Router.post('/login', authController.login)
Router.post('/', authController.createUser)
Router.post('/forgotPassword', authController.forgotPassword)
Router.patch('/resetPassword/:token', authController.resetPassword)

// for logged in user only
Router.use(routeProtect)
Router.patch('/updatePassword', authController.updatePassword)
Router.route('/profile')
  .patch(addUserIdToParams, userController.updateUser)
  .get(addUserIdToParams, userController.getUser)
  .delete(addUserIdToParams, userController.deleteUser)

// restrict role to admin
Router.use(routeRestriction('admin'))
Router.route('/')
  .delete(userController.deleteManyUser)
  .get(userController.getAllUsers)
  .put(userController.updateManyUsers)
module.exports = Router
