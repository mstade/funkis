module.exports = isStr

function isStr(x) {
  return type(x) === 'string'
}

const type = require('./type')