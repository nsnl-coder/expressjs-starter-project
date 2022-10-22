const userModel = require('../../models/user')
const catchAsync = require('../../utils/catchAsync')
const { responseWithJwtToken } = require('../../controllers/authController')

const signUp = catchAsync(async (req, res, next) => {
  const user = await userModel.create(req.body)
  responseWithJwtToken(res, user, 201)
})

module.exports = signUp
