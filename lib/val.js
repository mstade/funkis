module.exports = val

function val(x) {
  return is(Function, x)? x() : x
}

const is = require('./is')