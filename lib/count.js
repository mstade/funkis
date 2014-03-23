module.exports = count

function count(seq) {
  if (isNil(seq)) return 0

  const t = type(seq)
      , c = counter[t]

  if (!c) throw new TypeError("Don't know how to count a " + t)

  return c(seq)
}

const isNil = require('./isNil')
    , type  = require('./type')
    , keys  = Object.keys
    , abs   = Math.abs

const counter =
      { 'arguments' : countLength
      , 'number'    : countNumber
      , 'string'    : countLength
      , 'object'    : countKeys
      , 'array'     : countLength
      , 'seq'       : countSeq
      }


function countNumber(n) {
  return abs(n)
}

function countLength(x) {
  return x.length
}

function countKeys(o) {
  return keys(o).length
}

function countSeq(s) {
  if (s.length === undefined) {
    var c = 0

    do { c++ }
    while (s = s.tail())

    return c
  }

  return s.length
}