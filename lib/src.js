module.exports = src

function src(x) {
  const t = type(x)

  if (x == null) return t

  const s = from[t] || toString

  return s(x)
}

const type = require('./type')
    , from =
      { 'array'  : fromArray
      , 'string' : fromString
      , 'object' : fromObject
      }

function toString(x) {
  return String(x)
}

function fromString(x) {
  return '"' + x + '"'
}

function fromArray(x) {
  return '[' + x.map(src).join(',') + ']'
}

function fromObject(x) {
  return '{' + Object.keys(x).map(prop).join(',') + '}'

  function prop(k) {
    return '"' + k + '":' + src(x[k])
  }
}