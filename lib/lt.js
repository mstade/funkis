module.exports = lt

function lt(a, b) {
  var argc = arguments.length

  if (argc == 1) { return true  }
  if (argc == 2) { return a < b }

  var args = slice(arguments)

  return args.every(function(b, i, tail) {
    return i? tail[i - 1] < b : true
  })
}

var slice = require('./slice')