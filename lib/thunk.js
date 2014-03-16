module.exports = thunk

function thunk(fn, args) {
  if (!isFn(fn)) {
    args = [fn]
    fn = identity
  } else if (arguments.length > 2) {
    args = slice(arguments, 1)
  } else if (arguments.length > 1) {
    args = [args]
  } else {
    args = []
  }

  if (args.length > 1) {
    return function thunk() {
      return fn.apply(this, args)
    }
  } else if (args.length) {
    return function thunk() {
      return fn.call(this, args[0])
    }
  } else {
    return function thunk() {
      return fn.call(this)
    }
  }
}

const identity = require('./identity')
    , slice    = require('./slice')
    , isFn     = require('./isFn')