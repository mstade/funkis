module.exports = type

function type(x) {
  if (x !== x) return 'nan'

  var t = lower(str.call(x).slice(8, -1))

  if (t === 'object') {
    if (x.constructor === Object) {
      return t
    } else {
      var proto = Object.getPrototypeOf(x)

      if (type(proto) === 'function' && proto.name) {
        return proto.name
      } else if (x.constructor && x.constructor.name) {
        return x.constructor.name
      }
    }
  }

  return t
}

var lower   = require('./lowerCase')
  , str     = ({}).toString