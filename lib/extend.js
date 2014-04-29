module.exports = require("./variadic")(extend)

function extend(base, rest) {
  assert(isExtendable(base), TypeError("Base must be an extendable object."))
  assert(is(rest), TypeError("At least one extension object must be defined."))

  const traits = apply(merge, rest)
  return Object.create(base, describe(traits))
}

const describe = require("./describe")
    , assert   = require("./assert")
    , apply    = require("./apply")
    , merge    = require("./merge")
    , comp     = require("./comp")
    , is       = require("./is")
    , $        = require("./partial")

const isExtendable = $(is, Object.prototype)