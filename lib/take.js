module.exports = take

function take(n, coll) {
  coll = seq(coll)

  if (isNil(coll)) return seq(nil, nil, 0)

  if (coll.length !== undefined) {
    n = min(n, coll.length)
  }

  return seq(coll.head(), next, n)

  function next() {
    coll = coll.tail()
    return isNil(coll)? nil : coll.head()
  }
}

const isNil = require('./isNil')
    , nil   = require('./nil')
    , seq   = require('./seq')
    , min   = Math.min