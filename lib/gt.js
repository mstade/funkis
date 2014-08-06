module.exports = gt

function gt(a, b) { 
  var args = slice(arguments).reverse()

  return lt.apply(null, args)
}

var slice = require('./slice')
  , lt    = require('./lt')