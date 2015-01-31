module.exports = defprotocol

function defprotocol(name, sigs) {
  assert(is(String, name), 'Name must be a string.')
  assert(is(Object, sigs), 'Signatures must be an object.')

  var map = new WeakMap()

  defprop(Protocol, { toString : constantly('[protocol ' + name + ']') })

  return Protocol

  function Protocol(target, impl) {
    return arguments.length > 1
      ? reify(map, target, sigs, impl)
      : fetch(map, target, Protocol)
  }
}

function fetch(map, target, Protocol) {
  var T    = typeOf(target)
    , impl = map.get(T)

  if (!impl) return

  var exec = Object.create(Protocol, {})

  each(impl, function(sig) {
    var name = sig[0]
      , fun  = sig[1]

    exec[name] = fun.bind(target)
  })

  return exec
}

function reify(map, target, sigs, impl) {
  var T = is(Function, target)? target : typeOf(target)

  assert(not(map.has(T)), 'Protocol already implemented for type ' + type(target))

  var exec = {}

  map.set(T, exec)

  each(sigs, function(sig) {
    var name = sig[0]
      , args = sig[1]
      , fun  = impl[name]

    assert(fun, 'Missing implementation for ' + name)
    assert(every(args, $(is, Function)), 'Argument signature must be a function')

    exec[name] = function() {
      var vals = new Array(args.length)
        , raw  = [].slice.call(arguments)

      for (var i = 1; i < args.length; i++) {
        vals[i] = args[i](raw)
      }

      return fun.apply(this, vals)
    }
  })
}

function typeOf(x) {
  if (isnt(x)) {
    return nil
  } else {
    return x.constructor || Object.getPrototypeOf(x)
  }
}

var constantly = require('./constantly')
  , variadic   = require('./variadic')
  , defprop    = require('./defprop')
  , assert     = require('./assert')
  , lower      = require('./lowerCase')
  , every      = require('./every')
  , each       = require('./each')
  , type       = require('./type')
  , isnt       = require('./isnt')
  , src        = require('./src')
  , not        = require('./not')
  , nil        = {}
  , is         = require('./is')
  , $          = require('./partial')