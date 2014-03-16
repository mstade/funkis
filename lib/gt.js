module.exports = gt

function gt(a, b) { 
  const args = slice(arguments).reverse()

  return lt.apply(null, args)
}

const slice = require('./slice')
    , lt    = require('./lt')