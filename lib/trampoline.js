module.exports = require('./variadic')(trampoline)

function trampoline(fn, rest) {
  if (isnt(Function, fn)) return fn

  var result = fn.apply(this, rest);

  while (is(Function, result) && result.name === 'thunk') {
    result = result()
  }

  return result;
}

const identity = require('./identity')
    , slice    = require('./slice')
    , isnt     = require('./isnt')
    , is       = require('./is')