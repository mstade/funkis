module.exports = require('./variadic')(and)

function and(x, rest) {
  if (isEmpty(arguments)) return true

  var result = val(x)

  if (isnt(result) || isnt(rest)) return result

  rest.every(function(x) {
    return is(result = val(x))
  })

  return result
}

const isEmpty = require('./isEmpty') 
    , isnt    = require('./isnt')
    , val     = require('./val')
    , is      = require('./is')