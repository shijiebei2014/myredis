const path = require('path')
const express = require('express')
const app = express()
const redis = require('./utils/redis')
const server = require('http').createServer(app).listen(process.argv[2] || 4000)
const io = require('socket.io')(server)
const socket_redis = require('socket.io-redis')

io.adapter(socket_redis({ host: 'localhost', port: 6379 }));

app.use('/static',express.static(path.join(__dirname, '/../client')))

app.get('/dog/:name/:value', (req, res)=> {
	const {name, value} = req.params
	const promiseAll = (promises) => Promise.all(promises)
	
	switch(name) {
		case 'id':
			redis.commond('hgetall', 'dog:' + value).then(function (data) {
				res.send(data)
			}, function (err) {
				res.send('err:', err)
			})
			break;
		default:
			redis
				.commond('smembers', 'dog:' + name + ':' + value)
				.then(ids=>ids.map(id=>redis.commond('hgetall', id)))
				// .then((promises) => Promise.all(promises))
				.then(promiseAll)
				.then((datas)=> res.send(datas))
				.catch((err)=> console.log('err:', err))
	}
})

app.get('/', (req, res) => {
	const fs = require('fs')
	res.set('Content-Type', 'text/html')
	res.send(fs.readFileSync(__dirname + '/../index.html'))
})

app.get('/nsp', (req, res) => {
	const fs = require('fs')
	res.set('Content-Type', 'text/html')
	res.send(fs.readFileSync(__dirname + '/../nsp.html'))
})

const myns = io.of('myns')
myns.on('connection', (socket) => {
	socket.on('say:hello', (name) => {
		console.log(`name: ${name}`)
		// socket.broadcast.emit('say:hello', `${name} say hello`)
		socket.broadcast.emit('say:hello', `${name} say hello`)
	})
})

io.on('connection', (socket) => {
	socket.on('say:hello', (name) => {
		console.log(`name: ${name}`)
		// socket.broadcast.emit('say:hello', `${name} say hello`)
		// socket.broadcast.emit('say:hello', `${name} say hello`)
		socket.broadcast.emit('say:hello', `${name} say hello`)
	})

	socket.on('join:room', (roomName) => {
		// console.log(socket.rooms)
		Object.keys(socket.rooms).filter((r)=>r !== socket.id).forEach((r)=>socket.leave(r))
		
		setTimeout(function () {
			socket.join(roomName)
			// socket.broadcast.emit('join:room', `Someone join in the ${roomName}`)
			socket.to(roomName).emit('join:room', `Someone join in the ${roomName}`)
		}, 0)
	})
})

/*app.get('/dog/id/:id', function (req, res) {
	console.log(req.params.id)
	redis.commond('hgetall', 'dog:' + req.params.id).then(function (data) {
		res.send(data)
	}, function (err) {
		res.send('err:', err)
	})
})

app.get('/dog/age/:age', function (req, res) {
	console.log(req.params.age)
	const promiseAll = (promises) => Promise.all(promises)
	redis
		.commond('smembers', 'dog:age:' + req.params.age)
		.then(ids=>ids.map(id=>redis.commond('hgetall', id)))
		// .then((promises) => Promise.all(promises))
		.then(promiseAll)
		.then((datas)=> res.send(datas))
		.catch((err)=> console.log('err:', err))
})

app.get('/dog/name/:name', function (req, res) {
	console.log(req.params.name)
	const promiseAll = (promises) => Promise.all(promises)
	redis
		.commond('smembers', 'dog:name:' + req.params.name)
		.then(ids=>ids.map(id=>redis.commond('hgetall', id)))
		// .then((promises) => Promise.all(promises))
		.then(promiseAll)
		.then((datas)=> res.send(datas))
		.catch((err)=> console.log('err:', err))
})*/