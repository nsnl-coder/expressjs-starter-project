const isSchemaValid = require('../isSchemaValid')
const onCreateSchema = require('./onCreateSchema')
const onUpdateSchema = require('./onUpdateSchema')
const onLoginSchema = require('./onLoginSchema')

const onCreate = async (req, res, next) => {
  // turn off node validation in .env to test mongodb validation
  if (process.env.IS_NODE_VALIDATION_ON === 'false') return next()

  // 1) Sanitize unwanted data
  const {
    role,
    passwordChangedAt,
    passwordResetToken,
    passwordResetTokenExpires,
    isVerified,
    ...sanitizeData
  } = req.body
  // 2) Validate the schema, stop if data is not valid
  const isValid = await isSchemaValid(sanitizeData, onCreateSchema, res)
  if (!isValid) return

  // 3) if data is valid, go to next middleware
  req.body = sanitizeData
  next()
}

const onUpdate = async (req, res, next) => {
  // turn off node validation to test mongodb validation
  if (process.env.IS_NODE_VALIDATION_ON === 'false') return next()

  // 1) sanitize unwanted data
  const {
    role,
    password,
    confirmPassword,
    passwordChangedAt,
    passwordResetToken,
    passwordResetTokenExpires,
    isVerified,
    ...sanitizeData
  } = req.body

  // 2) if data is not valid with pre-defined schema, stop
  const isValid = await isSchemaValid(sanitizeData, onUpdateSchema, res)
  if (!isValid) return

  // 3) if data is valid, go to the next middleware
  req.body = sanitizeData
  next()
}

const onLogin = async (req, res, next) => {
  // turn off node validation to test mongodb validation
  if (process.env.IS_NODE_VALIDATION_ON === 'false') return next()

  // 1) Only take wanted data
  const { email, password } = req.body
  const sanitizeData = { email, password }

  // 2) if data is not valid, stop and send back an error
  const isValid = await isSchemaValid(sanitizeData, onLoginSchema, res)
  if (!isValid) return

  // 3) if data is valid, go to next middleware
  req.body = sanitizeData
  next()
}

const validateUser = { onCreate, onUpdate, onLogin }
module.exports = validateUser
