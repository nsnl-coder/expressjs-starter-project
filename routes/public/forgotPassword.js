const userModel = require('../../models/user')
const AppError = require('../../utils/AppError')
const catchAsync = require('../../utils/catchAsync')
const crypto = require('crypto')
const sendEmail = require('../../utils/email')

const forgotPassword = catchAsync(async (req, res, next) => {
  // 1) get user based on posted email
  const user = await userModel.findOne({ email: req.body.email })

  if (!user) {
    return next(new AppError('There is no user with provided email address'))
  }
  // 2) Generate reset password token
  const resetToken = crypto.randomBytes(32).toString('hex')
  user.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  user.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000

  await user.save()

  // 3) Send email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`

  try {
    await sendEmail({
      to: user.email,
      subject: 'Reset token (valid 10mins)',
      text: resetURL,
    })
  } catch (err) {
    user.passwordResetToken = undefined
    user.passwordResetTokenExpires = undefined
    await user.save()
    return next(
      new AppError('There was an error sending email. Try again later', 500)
    )
  }
  res.status(200).json({
    status: 'success',
    message: 'Reset token sent to your email',
  })
})

module.exports = forgotPassword
