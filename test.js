var leak = null, cnt = 0

// unused和someMethod两个闭包域共享一个作用与
// 而someMethod存在于全局,不会被释放
// 1次 longstr -> originLeakObject ->(共享的闭包域)someMethod -> leak
// 2次 longstr -> originLeakObject ->(共享的闭包域)someMethod -> originLeakObject -> someMethod -> leak
// 3次 longstr -> originLeakObject ->(共享的闭包域)someMethod -> originLeakObject -> someMethod -> originLeakObject -> someMethod -> someMethod -> leak
var interval = setInterval(function testLeak() {
    if (cnt > 2) {
      clearInterval(interval)
    }
    cnt++;
    var originLeakObject = leak;

    function unused() {
      if (originLeakObject) {
        console.log('hello unused')
      }
    }

    leak = {
      longstr: new Array(1e7).join('*'),
      someMethod: function() {
        console.log('someMethod')
      }
    }

    leak.someMethod()
}, 1000)
