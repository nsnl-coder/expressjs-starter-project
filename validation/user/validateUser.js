const onCreateSchema = require('./onCreateSchema')

const validateOne = require('../index')
const onUpdateSchema = require('./onUpdateSchema')

const onCreate = async (req, res, next) => {
  const {
    role,
    passwordChangedAt,
    passwordResetToken,
    passwordResetTokenExpires,
    ...sanitizeData
  } = req.body
  // validateOne(sanitizeData, onCreateSchema, res)
  req.body = sanitizeData
  next()
}

const onUpdate = async (req, res, next) => {
  // exclude role,password,confirmpassword
  const {
    role,
    password,
    confirmPassword,
    passwordChangedAt,
    passwordResetToken,
    passwordResetTokenExpires,
    ...sanitizeData
  } = req.body

  // validateOne(sanitizeData, onUpdateSchema, res)
  req.body = sanitizeData
  next()
}

const validateUser = { onCreate, onUpdate }
module.exports = validateUser
