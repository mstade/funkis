module.exports = constantly

function constantly(val) {
  return function constant() {
    return val
  }
}