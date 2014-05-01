module.exports = meta

const protoOf  = Object.getPrototypeOf
    , mutable  = Object.isExtensible
    , define   = Object.defineProperty
    , create   = Object.create
    , names    = Object.getOwnPropertyNames
    , isnt     = require("./isnt")
    , has      = require("./has")

function meta(x, data) {
  if (isnt(x)) return null

  if (arguments.length < 2) return (x[meta.key] || null)

  if (!mutable(x)) throw TypeError("Can't add metadata to non-extensible object.")

  const metadata = x[meta.key] || define(x, meta.key, { value: create(null) })[meta.key]

  names(data).forEach(function(name) {
    if (has(metadata, name)) throw TypeError("Can't change immutable metadata: "+name)
    define(metadata, name, { value: data[name], enumerable: true })
  })

  return metadata
}

define(meta, "key", { value: "^metadata:{}" })