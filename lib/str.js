module.exports = str

function str(x) {
  const t = type(x)

  return (t === 'array' || t === 'object')? json(x) : x + ''
}

const type = require('./type')
    , json = JSON.stringify