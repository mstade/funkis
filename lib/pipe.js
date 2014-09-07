module.exports = require('./variadic')(pipe)

function pipe(rest) {
  return apply(compose, rest.reverse())
}

var compose = require('./compose')
  , apply   = require('./apply')