module.exports = require('./variadic')(val)

function val(x, rest) {
  return is(Function, x)? apply(x, rest) : x
}

var apply = require('./apply')
  , is    = require('./is')