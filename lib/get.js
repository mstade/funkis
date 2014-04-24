module.exports = get

function get(map, key, notFound) {
  const val = is(map)? map[key] : undefined
  return is(undefined, val)? notFound : val
}

const is = require('./is')