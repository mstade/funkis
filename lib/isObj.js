module.exports = isObj

function isObj(x) {
  return type(x) === 'object'
}

const type = require('./type')