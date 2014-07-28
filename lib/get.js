module.exports = get

function get(map, key, notFound) {
  if (isnt(map)) return notFound
  if (!map.hasOwnProperty(key)) return notFound

  return map[key]
}

const isnt = require('./isnt')
    , is   = require('./is')