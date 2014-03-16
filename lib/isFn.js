module.exports = isFn

function isFn(x) {
  return type(x) === 'function'
}

const type = require('./type')