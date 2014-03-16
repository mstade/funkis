module.exports = slice

function slice(seq, beg, end) {
  if (!seq) return 0

  const argc = arguments.length

  ;(end = +end) === end || (end = INF)
  ;(beg = +beg) === beg || (beg = 0)

  return pie.call(seq, beg, end)
}

const pie = [].slice
    , INF   = Number.MAX_VALUE