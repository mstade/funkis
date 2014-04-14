module.exports = take

function take(n, coll) {
  if (isnt(n, Number)) throw new TypeError('Expected first argument to be a number.')
    
  coll = seq(coll)

  if (n <= 0 || isnt(coll)) return null
  
  return seq(next, min(n, coll.length))

  function next() {
    if (lt(--n, 0) || isnt(coll)) return seq.done

    const first = coll.first
    coll = coll.rest
    return first
  }
}

const isnt  = require('./isnt')
    , seq   = require('./seq')
    , min   = require('./min')
    , lt    = require('./lt')