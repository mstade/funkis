module.exports = seq

function seq(x) {
  if (x == null) return null

  const c = cons[type(x)]

  if (!c) throw new TypeError("Don't know how to create a sequence from " + type(x))

  return count(x)? c(x) : null
}

const count = require('./count')
    , type  = require('./type')
    , keys  = Object.keys
    , prop  = Object.defineProperty
    , cons  =
      { 'array'     : fromArray
      , 'string'    : fromString
      , 'object'    : fromObject
      }

function fromArray(x) {
  return makeIt(x.slice())
}

function fromString(x) {
  return makeIt(x.split(''))
}

function fromObject(x) {
  return makeIt(keys(x).map(function(k) {
    const o = {}; o[k] = x[k]
    return o
  }))
}

function makeIt(s, next, first) {
  prop(s, 'next',   { value: next  || _next })
  prop(s, 'first',  { value: first || _first })
  prop(s, 'typeOf', { value: function() { return 'seq' } })

  return Object.freeze(s)

  function _next() {
    return seq(s.slice(1))
  }
  
  function _first() {
    return s[0]
  }
}