const express = require('express')

const adminRouter = express.Router()

// user
adminRouter.get('/', (req, res) => {
  res.status(200).json({ message: 'Route activated ' })
})

// post: create post

module.exports = adminRouter
