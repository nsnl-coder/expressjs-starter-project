const yup = require('yup')
const MESSAGE = require('./../const')

const fullname = yup.string().min(6, MESSAGE.FULLNAME_MIN_LENGTH)

const phone = yup
  .string()
  .min(8, MESSAGE.PHONE_MIN_LENGTH)
  .max(12, MESSAGE.PHONE_MAX_LENGTH)
  .matches(/^\+?[0-9]*$/, MESSAGE.PHONE_NUMBER_ONLY)

const email = yup
  .string()
  .email(MESSAGE.PLEASE_PROVIDE_VALID_EMAIL)
  .required(MESSAGE.EMAIL_REQUIRED)

const onUpdateSchema = yup.object().shape({ fullname, email, phone })
module.exports = onUpdateSchema
