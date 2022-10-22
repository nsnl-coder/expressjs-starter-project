const PLEASE_PROVIDE_VALID_EMAIL = 'Please provide valid email'
const PASSWORD_MIN_LENGTH = 'Password should have at least 8 characters'
const PASSWORD_MUST_STRONGER =
  'Password must contain at least one capital letter (A-Z), number (0-9) and special character (@,#,$...)'
const PHONE_MIN_LENGTH = 'Your phone number shoud contain at least 8 characters'
const FULLNAME_MIN_LENGTH = 'Your fullname shoud contain at least 8 characters'
const PROVIDE_VALID_ROLE = "Please provide valid 'role'"
const PHONE_MAX_LENGTH = 'Phone number contains maxium 12 numbers'
const PHONE_NUMBER_ONLY =
  'Phone should only contain number (0-9) and a plus sign (+)'

// required
const PASSWORD_REQUIRED = 'Password is required'
const EMAIL_REQUIRED = 'Email is required'
const CONFIRM_PASSWORD_REQUIRED = 'Confirm Password is required'
const PASSWORDS_NOT_MATCH = 'Password are not match'

const ERROR_MESSAGE = {
  PLEASE_PROVIDE_VALID_EMAIL,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MUST_STRONGER,
  PHONE_MIN_LENGTH,
  PROVIDE_VALID_ROLE,
  FULLNAME_MIN_LENGTH,
  PHONE_MAX_LENGTH,
  PHONE_NUMBER_ONLY,
  // required
  PASSWORD_REQUIRED,
  EMAIL_REQUIRED,
  CONFIRM_PASSWORD_REQUIRED,
  PASSWORDS_NOT_MATCH,
}

module.exports = ERROR_MESSAGE
