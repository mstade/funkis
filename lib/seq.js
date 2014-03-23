module.exports = seq

function seq(first, next, size, desc) {
  const argc = count(arguments)

  if (argc > 1) {
    return make(first, next, size, desc)
  } else if (isNil(first)) {
    return null
  } else if (seq.isPrototypeOf(first)) {
    return first
  }

  const s = seqer[type(first)]

  if (!s) {
    throw new TypeError("Don't know how to create a sequence from " + type(first))
  }

  return count(first)? s(first) : null
}

const count = require('./count')
    , isNum = require('./isNum')
    , isNil = require('./isNil')
    , isStr = require('./isStr')
    , once  = require('./once')
    , type  = require('./type')
    , isFn  = require('./isFn')
    , keys  = Object.keys
    , prop  = Object.defineProperty
    , nil   = require('./nil')
    , src   = require('./src')
    , lt    = require('./lt')

const seqer =
      { 'array'     : fromArray
      , 'string'    : fromString
      , 'object'    : fromObject
      }

function fromArray(a) {
  return arraySeq(a.slice(), 0)
}

function fromString(s) {
  const chars = []

  for (var i = 0; i < s.length; i++) {
    var c = s.charCodeAt(i)

    if (lt(0xD800, c, 0xDBFF)) {
      chars.push(s.charAt(i) + s.charAt(++i))
    } else {
      chars.push(s.charAt(i))
    }
  }

  return arraySeq(chars, 0)
}

function fromObject(x) {
  const props = keys(x).map(function(k) {
    const o = {}; o[k] = x[k]
    return Object.freeze(o)
  })

  return arraySeq(props, 0)
}

function arraySeq(a, i) {
  return make(a[i], next, a.length, a)

  function next() {
    return a[++i]
  }
}

function make(first, next, size, desc) {
  if (!isStr(desc)) {
    desc = desc? src(desc) : '(lazy)'
  }

  const s = Object.create(seq,
    { head     : { value: head       }
    , tail     : { value: once(tail) }
    , length   : { value: size       }
    , valueOf  : { value: head       }
    , toString : { value: toString   }
    }
  )

  return Object.freeze(s)

  function head() {
    return first
  }

  function tail() {
    if (isNum(size) && size === 1) return null

    const rest = next.call(s)

    return rest === nil? null : seq(rest, next, size - 1)
  }

  function toString() {
    return desc
  }
}