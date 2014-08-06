module.exports = is

function is(c, x) {
  if (arguments.length === 1) {
    return !not(c)
  }

  var cs = lowerCase(c)

  if (cs === 'null') {
    return x == null
  } else if (cs === 'undefined') {
    return x === undefined
  } else if (cs === 'nan') {
    return x !== x
  } else if (c === Number || cs === 'number') {
    return x === x && type(x) === 'number'
  } else if (type(c) === 'string') {
    return cs === type(x)
  } else {
    return is(x) && x.constructor === c || c.isPrototypeOf(x)
  }
}

var lowerCase = require('./lowerCase') 
  , type      = require('./type')
  , not       = require('./not')