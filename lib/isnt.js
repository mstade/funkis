module.exports = isnt

function isnt(c, x) {
  return !(arguments.length > 1? is(c, x) : is(c))
}

const is = require('./is')