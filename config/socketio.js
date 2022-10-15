const socket = require('socket.io')

const expressServer = require('./expressServer')

const socketServer = socket.Server
const origin = process.env.HOST

const io = new socketServer(expressServer, {
  cors: {
    origin,
  },
})

io.on('connection', (socket) => {
  console.log('New user connected')
})
