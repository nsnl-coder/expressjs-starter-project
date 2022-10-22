const express = require('express')
const handlerFactory = require('../../controllers/handlerFactory/handlerFactory')
const authController = require('../../controllers/authController')
const userModel = require('../../models/user')
const addUserIdToParams = require('../../middleware/addUserIdToParams')
const userController = require('../../controllers/userController')

const router = express.Router()

router.patch('/updatePassword', authController.updatePassword)
router.use(userController.sanitizeData)

router
  .route('/profile')
  .patch(addUserIdToParams, handlerFactory.updateOne(userModel))
  .get(addUserIdToParams, handlerFactory.getOne(userModel))
  .delete(addUserIdToParams, handlerFactory.deleteOne(userModel))

module.exports = router
