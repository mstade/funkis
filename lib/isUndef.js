module.exports = isUndef

function isUndef(x) {
  return type(x) === 'undefined'
}

const type = require('./type')