const io = require('socket.io-emitter')({ host: '127.0.0.1', port: 6379 })
/**
 * 要与socket.io-redis配合使用,默认psubscribe socket.io*
 * 默认会往redis-client,publish socket.io#nsp# 发送消息
 */
io.emit('say:hello', 'ddd')

setTimeout(()=>process.exit(0), 2000)