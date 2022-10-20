const responseWithData = require('../utils/responseWithData')
const AppError = require('./../utils/AppError')

const handleCastErrorDB = (err) => {
  return {
    fieldName: err.path,
    errorType: 'CastError',
    message: `Expected '${err.kind}' but got '${err.valueType}'`,
  }
}

const handleDuplicateFieldsDB = (err) => {
  console.log(err)
  const duplicateField = Object.keys(err.keyValue)[0]
  const data = {
    duplicateField,
    message: `'${err.keyValue[duplicateField]}' already exists. Please choose another '${duplicateField}'`,
  }
  return data
}

const handleValidationErrorDB = (err) => {
  const errors = err.errors
  const data = []

  for (const property in errors) {
    const field = errors[property]

    // handle missing required field
    if (field.name === 'ValidatorError' && field.kind === 'required') {
      data.push({
        fieldName: property,
        errorType: 'missingRequiredField',
        message: `'${field.path}' is required`,
      })
    }

    // handle general validation error
    else if (field.name === 'ValidatorError' && field.kind !== 'required') {
      data.push({
        fieldName: property,
        errorType: 'ValidatorError',
        message: `${field.message}`,
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

  res.status(err.statusCode).json(data)
}

const globalErrorHandler = (err, req, res, next) => {
  console.log(err)
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  // development enviroment
  if (process.env.NODE_ENV === 'development') return sendErrorDev(err, req, res)

  // operational error

  if (err.isOperational)
    return responseWithData(res, { message: err.message }, err.statusCode || 400)

  // non operational eror
  let data = 'Something went very wrong'
  let statusCode = 400

  if (err.code === 11000) data = handleDuplicateFieldsDB(err)

  switch (err.name) {
    case 'CastError':
      data = handleCastErrorDB(err)
      break
    case 'ValidationError':
      data = handleValidationErrorDB(err)
      break
    case 'JsonWebTokenError':
      statusCode = 401
      data = 'Invalid token. Please log in again!'
      break
    case 'TokenExpiredError':
      statusCode = 401
      data = 'Your token has expired! Please log in again.'
      break
  }

  responseWithData(res, data, statusCode)
}

module.exports = globalErrorHandler
