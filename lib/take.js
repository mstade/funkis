module.exports = take

function take(n, coll) {
  coll = seq(coll)

  return seq(lim(n, next))

  function next() {
    if (isNil(coll)) return nil

    const head = coll.head
    coll = coll.tail
    return head
  }
}

const isNil = require('./isNil')
    , lim   = require('./lim')
    , nil   = require('./nil')
    , seq   = require('./seq')