module.exports = take

function take(n, coll) {
  coll = seq(coll)

  return seq(lim(n, next))

  function next() {
    if (isNil(coll)) return nil

    const first = coll.first
    coll = coll.rest
    return first
  }
}

const isNil = require('./isNil')
    , lim   = require('./lim')
    , nil   = require('./nil')
    , seq   = require('./seq')