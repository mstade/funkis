module.exports = nth

function nth(coll, i) {
  coll = seq(coll)

  var n = i

  while (n --> 0 && is(coll)) {
    coll = coll.rest
  }

  if (n > 0 || isnt(coll)) throw new RangeError('Index '+i+' is out of bounds.')

  return coll.first
}

var isnt = require('./isnt')
  , seq  = require('./seq')
  , is   = require('./is')