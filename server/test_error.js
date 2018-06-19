var callsites = require('./callsites')

Error.prepareStackTrace = function(err, callsites) {
  return err.toString() + '\n'
        + callsites.map(function(site) {
          return '-->' + (site.getFunctionName() || ' ') + '(' + site.getFileName() + ':' + site.getLineNumber() + ':' + site.getColumnNumber() + ')'
        }).join('\n')
}

var myObj = {}
function c() {
  console.log('c')
  var sites = callsites()
  console.log('--------start--------')
  for (var i = 0; i < sites.length; i++) {
    console.log(sites[i].getFunctionName())
  }
  console.log('--------end--------')
  Error.captureStackTrace(myObj, b)
  // console.trace()
}

function b() {
  console.log('b')
  c()
}

function a() {
  console.log('a')
  b()
}

a()
console.log(myObj.stack)
