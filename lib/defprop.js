module.exports = defprop

function defprop(target, fields, opts) {
  if (isnt(target)) throw TypeError("Target must exist.")
  if (isnt(fields)) throw TypeError("Fields must exist.")

  opts || (opts = {})

  var names  = Object.getOwnPropertyNames(fields)

  var isMutable = get(opts, "^writable", false)
    , isEnum    = get(opts, "^enumerable", false)
    , isConf    = get(opts, "^configurable", false)
    , scope     = get(opts, "^bind", false)

  return Object.defineProperties(target,
    names.reduce(function(p, k) {
      var prop = describe(fields, k)
	, opt  = $(get, opts[k])

      if (isnt(prop.get) && isnt(prop.set)) {
	prop.writable = opt("writable", isMutable)

	when(is(Function, prop.value) && opt("bind", scope), function(scope) {
	  prop.value = prop.value.bind(scope)
	})
      } else {
	when(prop.get && opt("writable") && !prop.set, function() {
	  throw TypeError("The accessor `"+k+"` can't be writable without a setter.")
	})

	when(opt("bind", scope), function(scope) {
	  prop.get && (prop.get = prop.get.bind(scope))
	  prop.set && (prop.set = prop.set.bind(scope))
	})
      }

      prop.enumerable   = opt("enumerable", isEnum)
      prop.configurable = opt("configurable", isConf)

      return (p[k] = prop), p
    }, {})
  )
}

var describe = Object.getOwnPropertyDescriptor
  , isEmpty  = require("./isEmpty")
  , isnt     = require("./isnt")
  , when     = require("./when")
  , get      = require("./get")
  , is       = require("./is")
  , $        = require("./partial")