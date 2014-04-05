module.exports = constantly

function constantly(val) {
  return function constantly() {
    return val
  }
}