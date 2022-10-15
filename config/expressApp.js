const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

// Router
const exampleRouter = require('../routes/exampleRoutes')
const pageNotFound = require('./../middleware/pageNotFound')
const globalErrorHandler = require('./../middleware/globalErrorHandler')

const app = express()

// Global middle ware
app.use(
  cors({
    origin: process.env.FRONTEND_HOST,
  })
)

app.use(helmet()) // set security headers
app.use(express.json({ limit: '10kb' })) // body parser
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(xss()) // prevent cross site scripting
app.use(mongoSanitize()) // Data sanitization against NoSQL query injection
app.use(hpp()) // prevent http parameter pollution

// Routers
app.use('/api/v1', exampleRouter)
app.use('*', pageNotFound)

// apply global error handler
app.use(globalErrorHandler)

module.exports = app
