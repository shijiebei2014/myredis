const io = require('socket.io-client')
const socket = io('http://localhost:4000/myns')

socket.emit('say:hello', 'hello')


setTimeout(()=>process.exit(0), 2000)