module.exports = apply

function apply(fn, args) {
  if (isnt(Function, fn)) throw new TypeError('First argument must be a function.')

  fn.apply(this, args)
}

const isnt = require('./isnt')