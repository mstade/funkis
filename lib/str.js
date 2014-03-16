module.exports = str

function str(x) {
  const t = type(x)

  if (x == null) return t

  const s = from[t] || toString

  return s(x)
}

const type = require('./type')
    , from =
      { 'array'  : JSON.stringify
      , 'object' : JSON.stringify
      }

function toString(x) {
  return x + ''
}