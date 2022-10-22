const userModel = require('../models/user')
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')

const routeRestriction = (...authorizedRoles) =>
  catchAsync(async (req, res, next) => {
    const user = await userModel.findOne(req.user._id).select('+role')
    console.log(user)

    const istrue = authorizedRoles.includes(user.role)
    if (!authorizedRoles.includes(user.role)) {
      return next(
        new AppError('You are not authorized to perform this action.', 404)
      )
    }
    next()
  })

module.exports = routeRestriction
