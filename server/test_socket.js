const net = require('net')

const socket = net.connect({host: 'localhost', port: 3000}, ()=> {
	console.log(socket.request)
})