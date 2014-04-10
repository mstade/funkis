module.exports = each

function each(s, it) {
  s = seq(s)

  while (!isNil(s)) {
    it(s.first)
    s = s.rest
  }
}

const isNil = require('./isNil')
    , type  = require('./type')
    , seq   = require('./seq')
    , nil   = require('./nil')