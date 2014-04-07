module.exports = seq

function seq(x, length) {
  if (isNil(x)) return nil
  if (seq.isPrototypeOf(x)) return x

  const cons = from[type(x)]

  if (!cons) {
    throw new TypeError("Don't know how to create a sequence from " + type(x))
  }

  if (cons === lazy && isNum(length) && length >= 0) {
    return lazy(lim(length, x), length)
  } else {
    return cons(x)
  }
}

const constantly = require('./constantly')
    , partial    = require('./partial')
    , isNil      = require('./isNil')
    , isNum      = require('./isNum')
    , once       = require('./once')
    , type       = require('./type')
    , keys       = Object.keys
    , lim        = require('./lim')
    , nil        = require('./nil')
    , lt         = require('./lt')

const from =
      { 'array'    : vec
      , 'string'   : str
      , 'object'   : obj
      , 'function' : lazy
      }

function vec(a) {
  if (!a.length) return nil

  const next = lim(a.length, function(i) { return a[i] })
  
  return lazy(next, a.length)
}

function str(s) {
  const chr = []

  for (var i = 0; i < s.length; i++) {
    var c = s.charCodeAt(i)

    if (lt(0xD800, c, 0xDBFF)) {
      chr.push(s.charAt(i) + s.charAt(++i))
    } else {
      chr.push(s.charAt(i))
    }
  }

  return vec(chr)
}

function obj(x) {
  const props = keys(x).map(function(k) {
    const o = {}; o[k] = x[k]
    return Object.freeze(o)
  })

  return vec(props)
}

function lazy(next, length) {
  const head = next()

  if (head === nil) return nil

  const s = Object.create(seq,
    { head     : { get: constantly(head) }
    , tail     : { get: once(partial(lazy, next, length)) }
    , next     : { value: iterate }
    , length   : { value: length }
    , valueOf  : { value: constantly(head) }
    , toString : { value: constantly('[seq lazy]')}
    }
  )

  var curr = s

  return s

  function iterate() {
    if (isNil(curr)) {
      curr = s
      return { done: '110% done with your shit ES6' }
    }

    const val = curr.head
    curr = curr.tail
    return { value: val }
  }
}