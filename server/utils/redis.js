const redis = require('redis')
const client = redis.createClient()

const dog1 = {name: 'hello', age: 10}
const dog2 = {name: 'world', age: 15}
const dog3 = {name: 'kuzim', age: 15}

client.hmset('dog:1', dog1)
client.hmset('dog:2', dog2)
client.hmset('dog:3', dog3)

client.sadd('dog:age:15', ['dog:2', 'dog:3'])
client.sadd('dog:age:10', ['dog:1'])

client.sadd('dog:name:hello', ['dog:1'])
client.sadd('dog:name:world', ['dog:2'])
client.sadd('dog:name:kuzim', ['dog:3'])

const promiser = function (resolve, reject) {
	return function(err, result) {
		if (err) {return reject(err)}
		resolve(result)
	}
}

const commond = function() {
	var args = arguments
	console.log(args)
	return new Promise(function (resolve, reject) {
		if (!args.length) {
			return reject('请指定至少一个参数')
		}
		const comm = args[0]
		args = Array.prototype.slice.call(args, 1)
		console.log(comm, args)
		if (typeof client[comm] !== 'function') {
			return reject('方法' + comm + '不存在')
		}

		client[comm].apply(client, args.concat([promiser(resolve, reject)]))
	})
}

module.exports.commond = commond