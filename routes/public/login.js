const catchAsync = require('../../utils/catchAsync')
const {
  responseWithJwtToken,
  isLoginPasswordCorrect,
} = require('../../controllers/authController')

const userModel = require('../../models/user')
const AppError = require('../../utils/AppError')

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password)
    return next(new AppError('Please provide both email and password'), 400)

  const user = await userModel.findOne({ email }).select('+password')
  const isLoginValid =
    user && (await isLoginPasswordCorrect(password, user.password))

  if (!isLoginValid) return next(new AppError('Incorrect email or password'))

  responseWithJwtToken(res, user, 200)
})

module.exports = login
