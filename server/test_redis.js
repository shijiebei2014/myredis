const io = require('socket.io-client')

const socket = io('http://localhost:4000')

socket.emit('join:room', 'one')

setTimeout(()=>process.exit(0), 2000)