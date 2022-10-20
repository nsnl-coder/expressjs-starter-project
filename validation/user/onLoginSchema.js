const yup = require('yup')
const MESSAGE = require('./../const')

const email = yup
  .string()
  .email(MESSAGE.PLEASE_PROVIDE_VALID_EMAIL)
  .required(MESSAGE.EMAIL_REQUIRED)

const passwordRules = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/

const password = yup
  .string()
  .min(8, MESSAGE.PASSWORD_MIN_LENGTH)
  .matches(passwordRules, {
    message: MESSAGE.PASSWORD_MUST_STRONGER,
  })
  .required(MESSAGE.PASSWORD_REQUIRED)

const onLoginSchema = yup.object().shape({ email, password })
module.exports = onLoginSchema
