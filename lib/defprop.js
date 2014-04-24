module.exports = defprop

function defprop(target, fields, opts) {
  if (isnt(target)) throw TypeError("Target must exist.")
  if (isnt(fields)) throw TypeError("Fields must exist.")

  opts || (opts = {})

  const names = Object.getOwnPropertyNames(fields)
      , scope = Object.create(target)

  return Object.defineProperties(target,
    names.reduce(function(p, k) {
      const prop = describe(fields, k)
          , opt  = $(get, opts[k])

      if (isnt(prop.get) && isnt(prop.set)) {
        prop.writable = opt("writable", false)

        is(Function, prop.value) && (prop.value = prop.value.bind(scope))
      } else {
        if (prop.get) {
          if (opt("writable") && !prop.set) throw TypeError("The accessor `"+k+"` can't be writable without a setter.")
          prop.get = prop.get.bind(scope)
        }

        prop.set && (prop.set = prop.set.bind(scope))
      }

      prop.enumerable   = opt("enumerable", false)
      prop.configurable = false

      return (p[k] = prop), p
    }, {})
  )
}

const describe = Object.getOwnPropertyDescriptor
    , isEmpty  = require("./isEmpty")
    , isnt     = require("./isnt")
    , get      = require("./get")
    , is       = require("./is")
    , $        = require("./partial")