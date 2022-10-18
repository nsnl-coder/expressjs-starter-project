const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minLength: [5, 'Name should have at least 5 characters'],
  },
  email: {
    type: Number,
  },
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel
