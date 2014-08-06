module.exports = partial

function partial(fun, args) {
  if (arguments.length === 1) return fun

  var part = [].slice.call(arguments, 1)

  return function partial() {
    var rest = [].slice.call(arguments)
    return fun.apply(this, part.concat(rest))
  }
}