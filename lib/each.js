module.exports = each

function each(coll, it) {
  coll = seq(coll)

  while (is(coll)) {
    it(coll.first)
    coll = coll.rest
  }
}

const type = require('./type')
    , seq  = require('./seq')
    , is   = require('./is')