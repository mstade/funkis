module.exports = inc

function inc(x) {
  var n = val(x)

  assert(is(Number, n), "Expected number, got: " + x)

  return n + 1
}

var assert = require('./assert')
  , val    = require('./val')
  , is     = require('./is')