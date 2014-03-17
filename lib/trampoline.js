const identity = require('./identity')
    , variadic = require('./variadic')
    , slice    = require('./slice')
    , isFn     = require('./isFn')
    , isTh     = require('./isTh')

module.exports = variadic(trampoline)

function trampoline(fn, rest) {
  if (!isFn(fn)) {
    return fn
  }

  var result = fn.apply(this, rest);

  while (isTh(result)) {
    result = result()
  }

  return result;
}