module.exports = isTh

function isTh(x) {
  return isFn(x) && x.name === 'thunk'
}

const isFn = require('./isFn')