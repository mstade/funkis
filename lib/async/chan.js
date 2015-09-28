module.exports = chan

function chan() {
  return create(
    { put  : { value: put  }
    , take : { value: take }
    }
  )

  function put(value) {
  }

  function take() {
  }
}

var create = Object.create

// var ReadPort = protocol({
//   'take' : [protocol, { returns: Promise }]
// })

// var WritePort = protocol({
//   'put' : [protocol, Object, { returns: Promise }]
// })

// var Channel = protocol({
//   'isClosed' : [protocol, { returns: Boolean }]
//   'close'    : [protocol]
// })

// var Channel = protocol({
//   'take' : { returns: Promise }
//   'put'  : { sig: [Object], returns: Promise }
// })

// var Channel = protocol({
//   'take' : { returns: Promise }
//   'put'  : { sig: [Object], returns: Promise }
// })

// Channel(thing).take()

// go(function *() {
//   var search = yield get('www.google.com').take()
// })