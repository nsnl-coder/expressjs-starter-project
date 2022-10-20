const yup = require('yup')
const MESSAGE = require('./../const')

const fullname = yup.string().min(6, MESSAGE.FULLNAME_MIN_LENGTH)

const phone = yup
  .string()
  .min(8, 'atletst8')
  .max(12, MESSAGE.PHONE_MAX_LENGTH)
  .matches(/^\+?[0-9]*$/, MESSAGE.PHONE_NUMBER_ONLY)

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

const confirmPassword = yup
  .string()
  .oneOf([yup.ref('password'), null], MESSAGE.PASSWORDS_NOT_MATCH)
  .required(MESSAGE.CONFIRM_PASSWORD_REQUIRED)

const onCreateSchema = yup.object().shape({ fullname, email, password, confirmPassword, phone })
module.exports = onCreateSchema
