module.exports = has

function has(x, key) {
  return is(x) && hasprop.call(x, key)
}

const hasprop = Object.prototype.hasOwnProperty
    , is      = require("./is")