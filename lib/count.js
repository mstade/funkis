module.exports = count

function count(x) {
  if (is(null, x)) return 0

  var t = type(x)
      , c = counter[t]

  if (!c) throw new TypeError("Count not supported on this type: " + t)

  return c(x)
}

var isnt = require('./isnt')
  , type = require('./type')
  , keys = Object.keys
  , abs  = Math.abs
  , is   = require('./is')

var counter =
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