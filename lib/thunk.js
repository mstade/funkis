module.exports = require('./variadic')(thunk)

function thunk(fn, rest) {
  if (isnt(Function, fn)) throw new TypeError('Expected `fn` to be a function.')

  if (is(rest)) {
    return function thunk() {
      return fn.apply(this, rest)
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
    , is       = require('./is')