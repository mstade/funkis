module.exports = slice

function slice(seq, beg, end) {
  if (!seq) return null

  var argc = arguments.length

  ;(end = +end) === end || (end = INF)
  ;(beg = +beg) === beg || (beg = 0)

  return pie.call(seq, beg, end)
}

var pie = [].slice
  , INF = Number.MAX_VALUE