module.exports = eq

function eq(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return abs(a - b) < EPS
  }

  return a == b
}

var EPS = Number.EPSILON || 2.220446049250313e-16
  , abs = Math.abs