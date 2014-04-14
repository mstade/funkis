module.exports = isnt

function isnt(x, proto) {
  return !(arguments.length > 1? is(x, proto) : is(x))
}

const is = require('./is')