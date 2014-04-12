module.exports = seq

function seq(x, length) {
  if (isnt(x) || length <= 0) return null
  if (seq.isPrototypeOf(x)) return x

  const cons = from[type(x)]

  if (!cons) {
    throw new TypeError("Don't know how to create a sequence from " + type(x))
  }

  return cons(x, isNum(length)? length : undefined)
}

seq.done = Object.freeze({ done: '(╯°□°）╯︵ ┻━┻' })

Object.freeze(seq)

const constantly = require('./constantly')
    , repeatedly = require('./repeatedly')
    , partial    = require('./partial')
    , isNum      = require('./isNum')
    , isnt       = require('./isnt')
    , once       = require('./once')
    , type       = require('./type')
    , keys       = Object.keys
    , lt         = require('./lt')

const from =
      { 'array'    : vec
      , 'string'   : str
      , 'object'   : obj
      , 'function' : lazy
      }

function vec(a) {
  if (!a.length) return null

  return repeatedly(a.length, next)

  function next(i) {
    return a[i++]
  }
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
  if (length <= 0) return null

  const first = constantly(next())

  if (first() === seq.done) return null

  const rest = once(partial(lazy, next, length - 1))

  const s = Object.create(seq,
    { first    : { get: first }
    , rest     : { get: rest }
    , next     : { value: iterate }
    , length   : { value: length }
    , valueOf  : { value: first }
    , toString : { value: constantly('[seq]')}
    }
  )

  var curr = s

  return s

  function iterate() {
    if (isnt(curr)) {
      curr = s
      return seq.done
    }

    const val = curr.first
    curr = curr.rest
    return { value: val }
  }
}