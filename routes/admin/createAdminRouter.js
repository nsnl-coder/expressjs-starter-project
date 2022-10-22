const express = require('express')
const handlerFactory = require('../../controllers/handlerFactory/handlerFactory')
const userModel = require('../../models/user')

const createAdminRouter = (route, model) => {
  const router = express.Router()
  router
    .route(`/${route}`)
    .get(handlerFactory.getAll(model))
    .patch(handlerFactory.updateMany(model))
    .delete(handlerFactory.deleteMany(model))

  router
    .route(`/${route}/:id`)
    .get(handlerFactory.getOne(model))
    .patch(handlerFactory.updateOne(model))
    .delete(handlerFactory.deleteOne(model))
    .post(handlerFactory.createOne(model))
  return router
}

module.exports = createAdminRouter
