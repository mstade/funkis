module.exports = isNil

function isNil(x) {
  // Because distinguishing between null and undefined is silly
  return x == null
}