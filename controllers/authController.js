const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const userModel = require('../models/user')
const bcrypt = require('bcrypt')

const signJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  })
}

const isLoginPasswordCorrect = async (candidate, hashedPassword) => {
  return await bcrypt.compare(candidate, hashedPassword)
}

const responseWithJwtToken = (res, user, statusCode) => {
  const status = statusCode.toString().startsWith('2') ? 'success' : 'fail'
  const token = signJwtToken(user._id)
  user.password = undefined

  res.status(statusCode || 200).json({
    status,
    token,
    data: user,
  })
}

const updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await userModel.findById(req.user.id).select('+password')
  if (!req.body.password)
    next(new AppError('Please provide your current password'))

  // 2) check if posted current password is correct
  if (!(await isLoginPasswordCorrect(req.body.password, user.password))) {
    return next(new AppError('Your password is incorrect. Please try again'))
  }

  // 3) if so, update password
  user.password = req.body.newPassword
  const newUser = await user.save()

  // 4) Log user in
  responseWithJwtToken(res, newUser, 200)
})

const authController = {
  updatePassword,
  responseWithJwtToken,
  isLoginPasswordCorrect,
}

module.exports = authController
