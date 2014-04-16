module.exports = isEmpty

function isEmpty(x) {
  return count(x) === 0
}

const count = require('./count')