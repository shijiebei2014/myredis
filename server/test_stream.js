const {Readable, Writable, Duplex, Transform} = require('stream')

const inStream = new Readable()
const outStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString())
    callback()
  }
})
let currentCode = 65
const alphaStream = new Readable({
  read(size) {
    this.push(String.fromCharCode(currentCode++))
    if (currentCode > 90) {
      this.push(null)
    }
  }
})

const duplexStream = new Duplex({
  read(size) {
    this.push(String.fromCharCode(currentCode++))
    if (currentCode > 90) {
      this.push(null)
    }
  },
  write(chunk, encoding, callback) {
    console.log(chunk.toString())
    callback()
  }
})

const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    console.log(chunk.toString().toUpperCase())
    callback()
  }
})

inStream.push('hello')
inStream.push('world')
inStream.push(null)

// inStream.pipe(process.stdout)

// inStream.pipe(outStream)
// alphaStream.pipe(outStream)
// process.stdin.pipe(duplexStream).pipe(process.stdout)
// process.stdin.pipe(upperCase).pipe(process.stdout)

// 如果push的内容不是string和buffer,则readableObjectMode为true
// 如果chunk的内容不是string和buffer,则writableObjectMode为true
const commaSplitter = new Transform({
  readableObjectMode: true,
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().trim().split(','))
    callback()
  }
})

const arrayToObject = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    let obj = {}
    for(let i = 0; i < chunk.length; i+=2) {
      obj[chunk[i]] = chunk[i+1]
    }
    this.push(obj)
    callback()
  }
})

const objectToString = new Transform({
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    this.push(JSON.stringify(chunk))
    callback()
  }
})

process.stdin
  .pipe(commaSplitter)
  .pipe(arrayToObject)
  .pipe(objectToString)
  .pipe(process.stdout)

commaSplitter.on('error', function(err) {
  console.log('object:', err)
})
objectToString.on('error', function(err) {
  console.log('object:', err)
})
