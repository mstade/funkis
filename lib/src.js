module.exports = src

function src(x) {
  var t = type(x)

  if (x == null) return t

  var s = from[t] || toString

  return s(x)
}

var keys = Object.getOwnPropertyNames
  , type = require("./type")
  , from =
    { "array"  : fromArray
    , "string" : fromString
    , "object" : fromObject
    }

function toString(x) {
  return String(x)
}

function fromString(x) {
  return '"' + x + '"'
}

function fromArray(x) {
  return "[" + x.map(src).join(",") + "]"
}

function fromObject(x) {
  return "{" + keys(x).filter(ignored).map(prop).join(",") + "}"

  function ignored(k) {
    return !(k === "constructor" || k === "prototype")
  }

  function prop(k) {
    return '"' + k + '":' + src(x[k])
  }
}