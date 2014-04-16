module.exports = type

function type(x) {
  if (x !== x) return 'nan'

  const t = str.call(x).slice(8, -1).toLowerCase()

  if (t === 'object') {
    // Check if prototype is a function and has a name
    const proto = Object.getPrototypeOf(x)
    if (type(proto) === 'function' && proto.name) return proto.name
  }

  return t
}

const str  = ({}).toString