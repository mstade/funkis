module.exports = is

function is(x, proto) {
  if (arguments.length === 1) {
    return x != null
  } else if (x === proto) {
    return true
  } else if (proto == null) {
    return false
  } else if (x == null) {
    return type(x) === String(proto).toLowerCase()
  } else if (x !== x) { // NaN
    return String(proto).toLowerCase() === 'nan'
  } else if (type(proto) === 'string') {      
    return type(x) === proto.toLowerCase()
  } else {
    return x.constructor === proto || proto.isPrototypeOf(x)
  }
}

const type  = require('./type')