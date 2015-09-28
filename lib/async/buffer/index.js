var defprotocol = require('../../defprotocol')

module.exports = defprotocol('Buffer',
  { add    : [Object]
  , isFull : []
  , remove : []
  }
)

module.exports = deftype(FixedBuffer, [LinkedList, Number], Buffer)

function FixedBuffer(size) {
  var list = []

  return Buffer(FixedBuffer,
    { add    : add
    , remove : remove
    , isFull : isFull
    }
  )

  function add(item) {
    !isFull() && list.unshift(item)
  }

  function remove() {
    return list.pop()
  }

  function isFull() {
    return list.length >= size
  }
}

Buffer(obj).add()