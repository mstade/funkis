module.exports = assert

function assert(x, message, type) {
  if (isnt(x)) {
    message = val(message)
    isnt(message) && (message = "Assertion failed.")
    throw is(Error, message)? message : Error(message)
  }

  return x
}

const isnt = require("./isnt")
    , val  = require("./val")
    , is   = require("./is")