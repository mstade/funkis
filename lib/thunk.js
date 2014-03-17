const identity = require('./identity')
    , variadic = require('./variadic')
    , slice    = require('./slice')
    , isFn     = require('./isFn')

module.exports = variadic(thunk)

function thunk(fn, rest) {
  if (!isFn(fn)) {
    rest = [fn]
    fn = identity
  }

  if (rest.length > 1) {
    return function thunk() {
      return fn.apply(this, rest)
    }
  } else if (rest.length) {
    return function thunk() {
      return fn.call(this, rest[0])
    }
  } else {
    return function thunk() {
      return fn.call(this)
    }
  }
}