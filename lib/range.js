module.exports = range

function range(start, end, step) {
  const argc = count(arguments)

  if (argc === 0) return range(0, Infinity, 1)
  if (argc === 1) return range(0, start, 1)
  if (argc === 2) return range(start, end, 1)

  if (isnt(start, Number)) throw new TypeError('Start must be a number.')
  if (isnt(end, Number))   throw new TypeError('End must be a number.')
  if (isnt(step, Number))  throw new TypeError('Step must be a number.')

  const size = floor(abs(end - start) / step)

  return repeatedly(size, next)

  function next(n) {
    return start + step * n
  }
}

const repeatedly = require('./repeatedly')
    , count      = require('./count')
    , floor      = Math.floor
    , isnt       = require('./isnt')
    , abs        = Math.abs