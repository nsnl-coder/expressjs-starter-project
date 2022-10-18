const express = require('express')

const Router = express.Router()

Router.post('/', (req, res) => {
  const { hithere } = req.body

  console.log(hithere)
  res.status(200).json({ message: 'Route activated ' })
})

module.exports = Router
