const express = require('express')

const forgotPassword = require('./forgotPassword')
const login = require('./login')
const resetPassword = require('./resetPassword')
const signup = require('./signup')
const userController = require('../../controllers/userController')

const router = express.Router()

router.post('/forgotPassword', forgotPassword)
router.post('/login', login)
router.patch('/resetPassword/:token', resetPassword)
router.post('/signup', userController.sanitizeData, signup)

module.exports = router
