const express = require('express')

const routeProtect = require('../../middleware/routeProtect')
const userRouter = require('./user')

const router = express.Router()

router.use(routeProtect)
router.use(userRouter)

module.exports = router
