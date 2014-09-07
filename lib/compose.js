module.exports = require('./variadic')(compose)

function compose(rest) {
  if (rest.some(part(isnt, Function))) throw new TypeError('All arguments must be functions.')

  rest.reverse()

  return function composition(init) {
    return rest.reduce(function(result, fn) {
      return fn(result)
    }, init)
  }
}

var part = require('./partial')
  , isnt = require('./isnt')