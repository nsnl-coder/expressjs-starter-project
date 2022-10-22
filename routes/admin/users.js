const userModel = require('../../models/user')
const createAdminRouter = require('./createAdminRouter')

// resources router
const userRouter = createAdminRouter('users', userModel)
module.exports = userRouter
