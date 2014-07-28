const $ = module.exports = require("./variadic")(partial)

function partial(fun, part) {
  if (isnt(part)) return fun

  return variadic(function(rest) {
    const args = part.map(function(arg) {
      return arg === $? rest.shift() : arg
    })

    return fun.apply(this, args.concat(rest))
  })
}

const variadic = require("./variadic")
    , each     = require("./each")
    , isnt     = require("./isnt")