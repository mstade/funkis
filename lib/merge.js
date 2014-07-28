module.exports = require("./variadic")(merge)

function merge(objects) {
  if (isEmpty(objects)) return

  return create(Object.prototype, objects.reduce(function(fields, t) {
    names(t).forEach(function(k) {
      fields[k] = describe(t, k)
    })
    
    return fields
  }, {}))
}

const describe = Object.getOwnPropertyDescriptor
    , isEmpty  = require("./isEmpty")
    , create   = Object.create
    , names    = Object.getOwnPropertyNames