const express = require('express')

// Router
const exampleRouter = require('../routes/exampleRoutes')
const pageNotFound = require('./../middleware/pageNotFound')
const globalErrorHandler = require('./../middleware/globalErrorHandler')

const app = express()

// Routers
app.use('/api/v1', exampleRouter)
app.use('*', pageNotFound)

// apply global error handler
app.use(globalErrorHandler)

module.exports = app
