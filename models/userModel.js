const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const MESSAGE = require('./../validation/const')

// fullname, username, email, password, phone

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
      min: [6, MESSAGE.FULLNAME_MIN_LENGTH],
    },
    email: {
      type: String,
      validate: [validator.isEmail, MESSAGE.PLEASE_PROVIDE_VALID_EMAIL],
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, MESSAGE.PASSWORD_MIN_LENGTH],
      validate: [validator.isStrongPassword, MESSAGE.PASSWORD_MUST_STRONGER],
      select: false,
    },
    phone: {
      type: String,
      minLength: [8, MESSAGE.PHONE_MIN_LENGTH],
      maxLength: [12, MESSAGE.PHONE_MAX_LENGTH],
      match: [/^\+?[0-9]*$/, MESSAGE.PHONE_NUMBER_ONLY],
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: MESSAGE.PROVIDE_VALID_ROLE,
      },
      default: 'user',
      select: false,
    },
    passwordChangedAt: {
      type: Date,
      select: false,
    },
    passwordResetToken: { type: String, select: false },
    passwordResetTokenExpires: { type: Date, select: false },
    testField: { type: mongoose.Schema.ObjectId },
  },
  { timestamps: true }
)

// hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
  this.passwordChangedAt = Date.now() - 1000
  next()
})

// exclude __v field
userSchema.pre(/^find/, function (next) {
  this.select('-__v -updatedAt')
  next()
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel
