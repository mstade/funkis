module.exports = apply

function apply(fn, args) {
  if (!isFn(fn)) throw new TypeError('First argument must be a function.')

  fn.apply(this, args)
}

const isFn  = require('./isFn')