module.exports = src

function src(x) {
  const t = type(x)

  if (x == null) return t

  const s = from[t] || toString

  return s(x)
}

const type = require('./type')
    , from =
      { 'array'  : JSON.stringify
      , 'string' : JSON.stringify
      , 'object' : JSON.stringify
      }

function toString(x) {
  return x + ''
}