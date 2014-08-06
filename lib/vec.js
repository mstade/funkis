module.exports = vec

function vec(coll) {
  var v = []

  each(coll, v.push.bind(v))

  return v
}


var each = require('./each')