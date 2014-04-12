module.exports = take

function take(n, coll) {
  coll = seq(coll)

  return is(coll)? seq(next, min(n, coll.length)) : null

  function next() {
    if (lt(--n, 0) || isnt(coll)) return seq.done

    const first = coll.first
    coll = coll.rest
    return first
  }
}

const isnt = require('./isnt')
    , seq  = require('./seq')
    , min  = require('./min')
    , lt   = require('./lt')
    , is   = require('./is')