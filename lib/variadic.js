module.exports = variadic

function variadic(fn) {
  if (isnt(Function, fn)) throw new TypeError('Parameter `fn` must be a function.')

  var argc  = fn.length - 1

  if (argc) {
    return function variadic() {
      var head = slice(arguments, 0, argc)
          , tail = slice(arguments, argc)

      return fn.apply(this, head.concat([tail]))
    }
  } else {
    return function variadic() {
      var rest = slice(arguments)
      return fn.call(this, rest)
    }
  }
}

var slice = require('./slice')
  , isnt  = require('./isnt')