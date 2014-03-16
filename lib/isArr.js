module.exports = isArr

function isArr(x) {
  return type(x) === 'array'
}

const type = require('./type')