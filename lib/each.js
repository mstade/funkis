module.exports = each

function each(s, it) {
  s = seq(s)

  while (!isNil(s)) {
    it(s.head)
    s = s.tail
  }
}

const isNil = require('./isNil')
    , type  = require('./type')
    , seq   = require('./seq')
    , nil   = require('./nil')