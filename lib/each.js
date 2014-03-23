module.exports = each

function each(s, it) {
  s = seq(s)

  if (!s) return

  do {
    it(s.head())
  } while (s = s.tail())
}

const type = require('./type')
    , seq  = require('./seq')