module.exports = variadic

function variadic(fn) {
  if (!isFn(fn)) throw new TypeError('Parameter `fn` must be a function.')

  const argc  = fn.length - 1

  if (argc) {
    return function variadic() {
      const head = slice(arguments, 0, argc)
          , tail = slice(arguments, argc)

      return fn.apply(this, head.concat([tail]))
    }
  } else {
    return function variadic() {
      const rest = slice(arguments)
      return fn.call(this, rest)
    }
  }
}

const slice = require('./slice')
    , isFn  = require('./isFn')