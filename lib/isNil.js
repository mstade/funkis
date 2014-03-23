module.exports = isNil

function isNil(x) {
  // Because distinguishing between null and undefined is silly
  return x === nil || x == null
}

const nil = require('./nil')