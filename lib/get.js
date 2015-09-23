module.exports = get

function get(map, key, notFound) {
  if (isnt(map)) return notFound

  if (is(Array, key)) {
    if (key.length) {
      var next = get(map, key[0], no)
      return next === no? notFound : get(next, key.slice(1), notFound)
    } else {
      return map
    }
  } else {
    return map.hasOwnProperty(key)? map[key] : notFound
  }
}

var assert = require('./assert')
  , isnt   = require('./isnt')
  , is     = require('./is')
  , no     = {}