module.exports = thunk

function thunk(fn, args) {
  if (!isFn(fn)) throw new TypeError('Expect fn to be a function.')

  if (arguments.length > 2) {
    args = slice(arguments, 1)
  } else if (arguments.length > 1) {
    args = [args]
  } else {
    args = []
  }

  const argc = args.length

  return function() {
    return argc? fn.apply(this, args) : fn.call(this)
  }
}

const slice = require('./slice')
    , isFn  = require('./isFn')