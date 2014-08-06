module.exports = once

function once(fn) {
  var ret

  return function once() {
    if (!ret) {
      ret = { value: fn.apply(this, slice(arguments)) }
    } 

    return ret.value
  }
}

var slice = require('./slice')