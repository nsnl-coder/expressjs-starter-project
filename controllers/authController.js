const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const bcrypt = require('bcrypt')
const sendEmail = require('../utils/email')

const signJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
}

const isLoginPasswordCorrect = async (candidate, hashedPassword) => {
  return await bcrypt.compare(candidate, hashedPassword)
}

const responseWithJwtToken = (res, user, statusCode) => {
  const status = statusCode.toString().startsWith('2') ? 'success' : 'fail'
  const token = signJwtToken(user._id)
  user.password = undefined
  user.role = undefined

  res.status(statusCode || 200).json({
    status,
    token,
    data: user,
  })
}

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) return next(new AppError('Please provide both email and password'), 400)

  const user = await userModel.findOne({ email }).select('+password')
  const isLoginValid = user && (await isLoginPasswordCorrect(password, user.password))

  if (!isLoginValid) return next(new AppError('Incorrect email or password'))

  responseWithJwtToken(res, user, 200)
})

const createUser = catchAsync(async (req, res, next) => {
  const user = await userModel.create(req.body)
  responseWithJwtToken(res, user, 201)
})

const resetPassword = catchAsync(async (req, res, next) => {
  // 1) set user based on token
  const resetToken = req.params.token
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  console.log(resetToken, '999999999999')
  console.log(hashedToken)
  // 2) If token has not expired and user exist, set new password
  const user = await userModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  })

  if (!user) next(new AppError('Token is invalid or has expired', 400))

  // 3) Update changePasswordAt properties for the user
  user.password = req.body.password
  user.passwordChangedAt = Date.now()
  user.passwordResetToken = undefined
  user.passwordResetTokenExpires = undefined

  await user.save()
  // 4) Log the user in = send back JWT token
  responseWithJwtToken(res, user, 200)
})

const forgotPassword = catchAsync(async (req, res, next) => {
  console.log('runnign')
  // 1) get user based on posted email
  const user = await userModel.findOne({ email: req.body.email })

  if (!user) {
    return next(new AppError('There is no user with provided email address'))
  }
  // 2) Generate reset password token
  const resetToken = crypto.randomBytes(32).toString('hex')
  user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
  user.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000

  await user.save()

  // 3) Send email
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`

  try {
    await sendEmail({ to: user.email, subject: 'Reset token (valid 10mins)', text: resetURL })
  } catch (err) {
    user.passwordResetToken = undefined
    user.passwordResetTokenExpires = undefined
    await user.save()
    return next(new AppError('There was an error sending email. Try again later', 500))
  }
  res.status(200).json({
    status: 'success',
    message: 'Reset token sent to your email',
  })
})

const updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await userModel.findById(req.user.id).select('+password')
  if (!req.body.password) next(new AppError('Please provide your current password'))

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

const authController = { login, createUser, resetPassword, forgotPassword, updatePassword }

module.exports = authController
