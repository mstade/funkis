module.exports = lim

function lim(n, fn) {
  if (!isNum(n) || n < 0) throw new TypeError('Limit must be a positive integer.')
  if (!isFn(fn)) throw new TypeError('Second argument must be a function.')

  var c = 0

  return function ltd() {
    return c < n? fn.apply(this, [c++].concat(arguments)) : nil
  }
}

const isNum = require('./isNum')
    , slice = require('./slice')
    , isFn  = require('./isFn')
    , nil   = require('./nil')