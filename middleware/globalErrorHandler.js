const AppError = require('./../utils/AppError')

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`
  return new AppError(message, 400)
}

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
  const message = `Duplicate field value: ${value}. Please use another value!`

  return new AppError(message, 400)
}

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message)
  const message = `Invalid input data. ${errors.join('. ')}`

  return new AppError(message, 400)
}

const handleJWTError = () => new AppError('Invalid token. Please log in again!', 401)

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401)

const sendErrorDev = (err, req, res) => {
  const data = {
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  }

  console.log(data)
  res.status(err.statusCode).json(data)
}

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    console.error('ERROR ', err)

    // 1) send message for handled errors
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      })
    }
    // 2) Send generic message for unexpected error
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    })
  }
}

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  // development enviroment
  if (process.env.NODE_ENV === 'development') return sendErrorDev(err, req, res)

  // enviroment = production
  let error

  // mongodb error
  if (err.name === 'CastError') error = handleCastErrorDB(error)
  if (err.code === 11000) error = handleDuplicateFieldsDB(error)
  if (err.name === 'ValidationError') error = handleValidationErrorDB(error)
  // jwt errors
  if (err.name === 'JsonWebTokenError') error = handleJWTError()
  if (err.name === 'TokenExpiredError') error = handleJWTExpiredError()

  sendErrorProd(error, req, res)
}

module.exports = globalErrorHandler
