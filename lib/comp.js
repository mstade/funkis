module.exports = require('./variadic')(comp)

function comp(rest) {
  if (!rest.every(isFn)) throw new TypeError('All arguments must be functions.')

  return function composition(init) {
    return rest.reduce(function(result, fn) {
      return fn(result)
    }, init)
  }
}

const isFn = require('./isFn')