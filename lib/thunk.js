module.exports = require('./variadic')(thunk)

function thunk(fn, rest) {
  if (isnt(Function, fn)) {
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

const identity = require('./identity')
    , slice    = require('./slice')
    , isnt     = require('./isnt')