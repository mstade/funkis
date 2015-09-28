module.exports = every

function every(coll, it) {
  coll = seq(coll)

  while (is(coll)) {
    if (!it(coll.first)) return false
    coll = coll.rest
  }

  return true
}

var type = require('./type')
  , seq  = require('./seq')
  , is   = require('./is')