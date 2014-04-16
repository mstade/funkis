module.exports = not

function not(x) {
  return x === false || x == null
}

const isnt = require('./isnt')