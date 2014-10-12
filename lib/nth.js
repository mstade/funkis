module.exports = nth

function nth(coll, i) {
  if (is(Array, coll)) {
    assert(0 <= i && i < coll.length, $(bounds, i))
    return coll[i]
  }

  coll = seq(coll)

  var n = i

  while (n --> 0 && is(coll)) {
    coll = coll.rest
  }

  assert(n < 0 && coll, $(bounds, i))

  return coll.first
}

var assert = require("./assert")
  , isnt   = require("./isnt")
  , seq    = require("./seq")
  , is     = require("./is")
  , $      = require("./partial")

function bounds(i) {
  return RangeError("Index "+i+" is out of bounds.")
}