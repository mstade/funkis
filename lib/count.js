module.exports = count

function count(seq) {
  if (!seq) return 0

  const c = counter[type(seq)] || countKeys

  return c(seq)
}

const type = require('./type')
    , keys = Object.keys
    , abs  = Math.abs

const counter =
      { 'arguments' : countLength
      , 'string'    : countLength
      , 'array'     : countLength
      , 'seq'       : countSeq
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