module.exports = require("./variadic")(describe)

function describe(obj, fields) {
  assert(is(Object.prototype, obj), TypeError("Can't describe non-object: " + src(obj)))

  const descprop = $(Object.getOwnPropertyDescriptor, obj)

  if (is(fields)) {
    const hasprop = obj.hasOwnProperty.bind(obj)
        , props   = []

    return fields.map(function(name) {
      assert(hasprop(name), TypeError("Can't describe non-existant property: " + name))
      return [name, descprop(name)]
    })
  } else {
    return names(obj).map(function(name) {
      return [name, descprop(name)]
    }, {})
  }
}

const assert = require("./assert")
    , names  = Object.getOwnPropertyNames
    , each   = require("./each")
    , src    = require("./src")
    , is     = require("./is")
    , $      = require("./partial")