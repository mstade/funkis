module.exports = each

function each(s, it) {
  s = seq(s)

  if (isNil(s) || s.head() === nil) return

  do {
    it(s.head())
  } while (s = s.tail())
}

const isNil = require('./isNil')
    , type  = require('./type')
    , seq   = require('./seq')
    , nil   = require('./nil')