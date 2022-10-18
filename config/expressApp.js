const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

const app = express()

// security enhance
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

// Router
const pageNotFound = require('./../middleware/pageNotFound')
const globalErrorHandler = require('./../middleware/globalErrorHandler')
const userRouter = require('./../routes/userRoutes')

app.use('/api/v1/users', userRouter)
app.use('*', pageNotFound)
app.use(globalErrorHandler)

module.exports = app
