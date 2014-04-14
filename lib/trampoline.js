module.exports = require('./variadic')(trampoline)

function trampoline(fn, rest) {
  if (isnt(fn, Function)) return fn

  var result = fn.apply(this, rest);

  while (is(result, Function) && result.name === 'thunk') {
    result = result()
  }

  return result;
}

const identity = require('./identity')
    , slice    = require('./slice')
    , isnt     = require('./isnt')
    , is       = require('./is')