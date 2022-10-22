const catchAsync = require('../../utils/catchAsync')
const crypto = require('crypto')
const userModel = require('../../models/user')
const AppError = require('../../utils/AppError')
const { responseWithJwtToken } = require('../../controllers/authController')

const resetPassword = catchAsync(async (req, res, next) => {
  // 1) set user based on token
  const resetToken = req.params.token
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

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

module.exports = resetPassword
