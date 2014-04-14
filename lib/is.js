module.exports = is

function is(x) {
  return !isnt(x)
}

const isnt = require('./isnt')