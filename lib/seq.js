module.exports = seq

function seq(x, length) {
  if (isnt(x) || length <= 0) return null
  if (seq.isPrototypeOf(x)) return x

  const cons = from[type(x)]

  if (!cons) {
    throw new TypeError("Don't know how to create a sequence from " + type(x))
  }

  return cons(x, is(length, Number)? length : undefined)
}

seq.done = Object.freeze({ done: '(╯°□°）╯︵ ┻━┻' })

Object.freeze(seq)

const constantly = require('./constantly')
    , repeatedly = require('./repeatedly')
    , partial    = require('./partial')
    , isnt       = require('./isnt')
    , comp       = require('./comp')
    , once       = require('./once')
    , type       = require('./type')
    , keys       = Object.keys
    , lt         = require('./lt')
    , is         = require('./is')

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

  const head = once(next)

  const done = once(comp(head, function(head) {
    return head === seq.done
  }))

  const first = once(comp(done, function(done) {
    return done? null : head()
  }))

  const rest = once(comp(done, function(done) {
    return done? null : lazy(next, length - 1)
  }))

  const size = once(comp(done, function(done) {
    return done? 0 : length
  }))

  const iterate = (function(curr) {
    return comp(done, function(empty) {
      if (empty) {
        return seq.done
      } else if (curr === seq.done) {
        return (curr = null), seq.done
      } else if (curr) {
        const val = curr.first
        curr = curr.rest || seq.done
        return { value: val }
      } else {
        curr = rest()
        return { value: first() }
      }
    })
  }())

  return Object.create(seq,
    { first    : { get: first }
    , rest     : { get: rest }
    , next     : { value: iterate }
    , length   : { get: size }
    , valueOf  : { value: first }
    , toString : { value: constantly('[seq]')}
    }
  )
}