const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')

const routeProtect = catchAsync(async (req, res, next) => {
  const { authorization: bearerToken } = req.headers

  if (!bearerToken)
    return next(
      new AppError('You are not logged in! Please log in to get access')
    )

  if (!bearerToken.startsWith('Bearer'))
    return next(new AppError("The token must start with 'Bearer'"))

  const token = bearerToken.split(' ')[1]
  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  const user = await userModel.findById(decoded.id).select('+passwordChangedAt')

  if (!user)
    return next(new AppError('Cant find an user belongs to provided token'))

  console.log(user)

  console.log(user.passwordChangedAt + 'vs' + decoded.iat)

  if (isRecentlyChangePassword(decoded.iat, user.passwordChangedAt)) {
    return next(
      new AppError('You recently changed your password, please login again !')
    )
  }

  req.user = user
  next()
})

function isRecentlyChangePassword(JwtTimestamp, passwordChangedAt) {
  const changedTimestamp = parseInt(passwordChangedAt.getTime() / 1000, 10)
  return JwtTimestamp < changedTimestamp
}

module.exports = routeProtect
