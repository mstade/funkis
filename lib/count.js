module.exports = count

function count(coll) {
  if (isnt(coll)) return 0

  const t = type(coll)
      , c = counter[t]

  if (!c) throw new TypeError("Don't know how to count a " + t)

  return c(coll)
}

const isnt = require('./isnt')
    , type  = require('./type')
    , keys  = Object.keys
    , abs   = Math.abs

const counter =
      { 'arguments' : len
      , 'number'    : abs
      , 'string'    : len
      , 'object'    : key
      , 'array'     : len
      , 'seq'       : len
      }


function len(x) {
  return x.length
}

function key(o) {
  return keys(o).length
}