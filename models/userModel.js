const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

// fullname, username, email, password, phone

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, 'Please provide valid email'],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minLength: [8, 'Password should have at least 8 characters'],
      validate: [
        validator.isStrongPassword,
        'Password must contain 1 uppercase letter(A-Z), 1 number (0-9) and 1 special character (@#$%%^...)',
      ],
    },
    phone: {
      type: Number,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: "Please provide valid 'role'",
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
