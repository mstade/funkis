module.exports = require('./variadic')(comp)

function comp(rest) {
  if (rest.some(isntFn)) throw new TypeError('All arguments must be functions.')

  return function composition(init) {
    return rest.reduce(function(result, fn) {
      return fn(result)
    }, init)
  }
}

function isntFn(x) {
  return isnt(x, Function)
}

const isnt = require('./isnt')