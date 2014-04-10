module.exports = isEmpty

function isEmpty(x) {
  const t = type(x)

  if (t === 'seq') return x.length === 0

  return count(x) === 0
}

const count = require('./count')
    , type  = require('./type')