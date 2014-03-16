module.exports = each

function each(s, it) {
  s = seq(s)

  do {
    it(s.first())
  } while (s = s.next())
}

const type = require('./type')
    , seq  = require('./seq')