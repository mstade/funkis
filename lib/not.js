module.exports = not

function not(x) {
  return x === false || x == null
}

var isnt = require('./isnt')