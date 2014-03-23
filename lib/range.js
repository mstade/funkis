module.exports = range

function range(start, end, step) {
  const argc = count(arguments)

  if (argc === 0) return range(0, Infinity, 1)
  if (argc === 1) return range(0, start, 1)
  if (argc === 2) return range(start, end, 1)

  if (!isNum(start)) throw new TypeError('Start must be a number.')
  if (!isNum(end))   throw new TypeError('End must be a number.')
  if (!isNum(step))  throw new TypeError('Step must be a number.')

  const size = floor(abs(end - start) / step)

  return seq(start, inc, size, '(range '+start+' '+end+' '+step+')')

  function inc() {
    return this + step
  }
}

const count = require('./count')
    , isNum = require('./isNum')
    , floor = Math.floor
    , seq   = require('./seq')
    , abs   = Math.abs