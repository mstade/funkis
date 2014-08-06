module.exports = type

function type(x) {
  if (x !== x) return 'nan'

  var t = str.call(x).slice(8, -1).toLowerCase()

  if (t === 'object') {
    // Check if prototype is a function and has a name
    var proto = Object.getPrototypeOf(x)
    if (type(proto) === 'function' && proto.name) return proto.name
  }

  return t
}

var str = ({}).toString