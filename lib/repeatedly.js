module.exports = repeatedly

function repeatedly(n, fn) {
  return count(arguments) > 1? take(n, call(fn)) : call(n)
}

function call(fn) {
  if (!isFn(fn)) throw new TypeError('Iterator must be a function.')

  var i = 0

  return seq(next, Infinity)

  function next() {
    return fn(i++)
  }
}

const count = require('./count')
    , take  = require('./take')
    , isFn  = require('./isFn')
    , seq   = require('./seq')