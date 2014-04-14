module.exports = isTh

function isTh(x) {
  return is(x, Function) && x.name === 'thunk'
}

const is = require('./is')