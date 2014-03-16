module.exports = type

function type(x) {
  if (x && type(x.typeOf) === 'function') {
    return x.typeOf()
  }
  
  return str.call(x).slice(8, -1).toLowerCase()
}

const str = ({}).toString