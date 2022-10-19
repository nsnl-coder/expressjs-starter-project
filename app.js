const dotenv = require('dotenv')
dotenv.config()

const yup = require('yup')

const email = yup.string().email('Please enter a valid email').required('Required')

// config express app
require('./config/expressApp')

// create http server from app
require('./config/expressServer')

// connect mongodb database
require('./config/database')
