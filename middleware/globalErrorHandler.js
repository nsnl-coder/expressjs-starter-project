const responseWithData = require('../utils/responseWithData')
const AppError = require('./../utils/AppError')

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`
  return new AppError(message, 400)
}

const handleDuplicateFieldsDB = (err) => {
  const duplicateField = Object.keys(err.keyValue)[0]
  const data = {
    duplicateField,
    message: `'${duplicateField}' already exists. Please choose another '${duplicateField}'`,
  }
  return data
}

const handleValidationErrorDB = (err) => {
  const errors = err.errors
  const data = []

  for (const property in errors) {
    const field = errors[property]

    if (field.name === 'ValidatorError') {
      data.push({ fieldName: property, errorType: 'ValidatorError', message: `${field.message}` })
    }

    if (field.name === 'CastError') {
      data.push({
        fieldName: property,
        errorType: 'CastError',
        message: `Expected '${field.kind}' but got '${field.valueType}'`,
      })
    }
  }
  return data
}

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

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  // development enviroment
  if (process.env.NODE_ENV === 'development') return sendErrorDev(err, req, res)

  // enviroment = production
  // if (!err.isOperational) {
  //   return res.status(500).json({
  //     status: 'error',
  //     message: 'Something went very wrong!',
  //   })
  // }

  let data = 'Something went very wrong'
  let statusCode = 400

  if (err.code === 11000) data = handleDuplicateFieldsDB(err)
  else if (err.name === 'ValidationError') data = handleValidationErrorDB(err)
  else if (err.name === 'JsonWebTokenError') {
    statusCode = 401
    data = 'Invalid token. Please log in again!'
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401
    data = 'Your token has expired! Please log in again.'
  }

  responseWithData(res, data, statusCode)
}

module.exports = globalErrorHandler
