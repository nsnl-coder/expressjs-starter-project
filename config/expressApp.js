const express = require('express')

// Router
const exampleRouter = require('../routes/exampleRoutes')
const pageNotFound = require('./../middleware/pageNotFound')

const app = express()

// Routers
app.use('/api/v1', exampleRouter)

// Not found route
app.use('*', pageNotFound)

module.exports = app
