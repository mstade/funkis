module.exports = require('./variadic')(merge)

function merge(rest) {
  var result = {}
  
  rest.forEach(function(obj) {
    keys(obj).forEach(function(k) {
      result[k] = obj[k]
    })
  })

  return result
}

var keys = Object.keys