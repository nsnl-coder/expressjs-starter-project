const dotenv = require('dotenv')
dotenv.config()

// config express app
require('./config/expressApp')

// create http server from app
require('./config/expressServer')

// connect mongodb database
require('./config/database')
