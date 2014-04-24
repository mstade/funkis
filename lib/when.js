module.exports = when

function when(cond, body) {
  const it = val(cond)
  return is(it)? val(body, it) : null
}

const val = require('./val')
    , is  = require('./is')
