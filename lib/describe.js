module.exports = require("./variadic")(describe)

function describe(obj, fields) {
  assert(is(Object.prototype, obj), TypeError("Can't describe non-object: " + src(obj)))

  const descprop = $(Object.getOwnPropertyDescriptor, obj)

  if (is(fields)) {
    const hasprop = obj.hasOwnProperty.bind(obj)
        , props   = {}

    each(fields, function(name) {
      assert(hasprop(name), TypeError("Can't describe non-existant property: " + name))
      props[name] = descprop(name)
    })

    return props
  } else {
    return names(obj).reduce(function(fields, name) {
      return fields[name] = descprop(name), fields
    }, {})
  }
}

const assert = require("./assert")
    , names  = Object.getOwnPropertyNames
    , each   = require("./each")
    , src    = require("./src")
    , is     = require("./is")
    , $      = require("./partial")