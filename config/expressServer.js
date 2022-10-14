const app = require('./expressApp')

const PORT = process.env.PORT

const expressServer = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`)
})

module.exports = expressServer
