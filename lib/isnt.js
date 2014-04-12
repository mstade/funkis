module.exports = isnt

function isnt(x) {
  // Because distinguishing between null and undefined is silly
  return x == null
}