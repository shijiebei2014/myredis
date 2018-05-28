const express = require('express')
const app = express()
const redis = require('./utils/redis')

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

app.listen(4000, function (err) {
	console.log('http://localhost:4000/')
})