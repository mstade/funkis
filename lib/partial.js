var $ = module.exports = require('./variadic')(partial)

function partial(fun, part) {
  if (isEmpty(part)) return fun

  return variadic(function(rest) {
    var args = part.map(function(arg) {
      return arg === $? rest.shift() : arg
    })

    return fun.apply(this, args.concat(rest))
  })
}

var variadic = require('./variadic')
  , isEmpty  = require('./isEmpty')
  , each     = require('./each')
  , isnt     = require('./isnt')