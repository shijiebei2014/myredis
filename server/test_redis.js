/*const io = require('socket.io-client')

const socket = io('http://localhost:4000')

socket.emit('join:room', 'one')

setTimeout(()=>process.exit(0), 2000)*/
const commond = require('./utils/redis').commond

commond('hkeys', 'ou_p_tree').then((data)=>console.log('data:', data)).catch(err=>console.log(err))

/*commond('set', 'test', 'hello redis').then(()=>{
    return commond('expire', 'test', 50)
}).then((data)=>{
  console.log('data:', data)
}).catch((err)=>{
  console.log('err:', err)
})*/

/*commond('sadd', 'set', 3, 5, 4).then(data=>{
  console.log('data:', data)
}).catch(err=>{
  console.log('err:', err)
})
*/

/*commond('set', 'digit', 1).then(()=> {
  return commond('incr', 'digit')
}).then(()=>{
  return commond('get', 'digit')
}).then(()=>{
  return commond('decr', 'digit')
}).then(()=>{
  return commond('decr', 'digit')
}).then(data=>console.log('data:', data)).catch((err)=> {
  console.log('err:', err)
})*/
