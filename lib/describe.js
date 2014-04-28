module.exports = describe

function describe(obj, field) {
  assert(isObject(obj), TypeError("Can't describe non-object: " + src(obj)))

  const descprop = $(Object.getOwnPropertyDescriptor, obj)

  if (is(field)) {
    assert(obj.hasOwnProperty(field), TypeError("Can't describe non-existant property: " + field))
    return descprop(field)
  } else {
    return names(obj).reduce(function(fields, k) {
      return fields[k] = descprop(k), fields
    }, {})
  }
}

const assert   = require("./assert")
    , names    = Object.getOwnPropertyNames
    , comp     = require("./comp")
    , type     = require("./type")
    , get      = require("./get")
    , src      = require("./src")
    , is       = require("./is")
    , $        = require("./partial")

const isObject = comp(type, $(get, { "function": true, "object": true, "array": true }), Boolean)