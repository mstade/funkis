module.exports = isEmpty

function isEmpty(x) {
  return count(x) === 0
}

var count = require('./count')