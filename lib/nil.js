nil.valueOf  = nil
nil.toString = toString

module.exports = Object.freeze(nil)

function nil()      { return nil }
function toString() { return ''  }