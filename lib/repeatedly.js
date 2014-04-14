module.exports = repeatedly

function repeatedly(n, fn) {
  if (count(arguments) === 1) {
    fn = n
     n = Infinity
  }

  if (isnt(Function, fn)) throw new TypeError('Iterator must be a function.')

  const calls = seq(call(fn), n)

  return n < Infinity? take(n, calls) : calls
}

function call(fn) {
  var i = 0
  
  return function next() {
    return fn(i++)
  }
}

const count = require('./count')
    , take  = require('./take')
    , isnt  = require('./isnt')
    , seq   = require('./seq')