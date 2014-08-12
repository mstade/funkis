module.exports = get

function get(map, key, notFound) {
  if (isnt(map)) return notFound
  if (!map.hasOwnProperty(key)) return notFound

  return map[key]
}

var isnt = require('./isnt')
  , is   = require('./is')