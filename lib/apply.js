module.exports = apply

function apply(fn, args) {
  if (isnt(fn, Function)) throw new TypeError('First argument must be a function.')

  fn.apply(this, args)
}

const isnt = require('./isnt')