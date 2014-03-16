module.exports = isNum

function isNum(x) {
  return x === x && type(x) === 'number'
}

const type = require('./type')