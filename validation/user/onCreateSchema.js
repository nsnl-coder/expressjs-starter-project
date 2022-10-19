const yup = require('yup')

const email = yup.string().email('nodePlease enter a valid email').required('nodeRequired')

const age = yup
  .number()
  .transform((value) => (isNaN(value) ? undefined : value))
  .positive()
  .integer()
  .optional()

const passwordRules = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})/
const password = yup
  .string()
  .min(5, 'nodePassword should contain at least 6 characters')
  .matches(passwordRules, {
    message:
      'nodePassword must contain at least one capital letter (A-Z), number (0-9) and special character (@,#,$...) ',
  })
  .required('nodeRequired')

const confirmPassword = yup
  .string()
  .oneOf([yup.ref('password'), null], 'nodePasswords must match')
  .required('nodeRequired')

const onCreateSchema = yup.object().shape({ email, password, confirmPassword, age })
module.exports = onCreateSchema
