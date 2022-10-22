const express = require('express')
const routeProtect = require('../../middleware/routeProtect')
const routeRestriction = require('./../../middleware/routeRestriction')
const userRouter = require('./users')

const router = express.Router()

// restrict route to admin only
router.use(routeProtect)
router.use(routeRestriction('admin'))

// resources router
router.use(userRouter)

module.exports = router
