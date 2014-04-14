module.exports = is

function is(c, x) {
  if (arguments.length === 1) {
    return c != null
  } else if (x === c) {
    return true
  } else if (c == null) {
    return false
  } else if (x == null) {
    return type(x) === String(c).toLowerCase()
  } else if (x !== x) { // NaN
    return String(c).toLowerCase() === 'nan'
  } else if (type(c) === 'string') {      
    return type(x) === c.toLowerCase()
  } else {
    return x.constructor === c || c.isPrototypeOf(x)
  }
}

const type  = require('./type')