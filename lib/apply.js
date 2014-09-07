module.exports = apply

function apply(fn, args) {
  if (isnt(Function, fn)) throw new TypeError('First argument must be a function.')
  return fn.apply(this, args)
}

var isnt = require('./isnt')