module.exports = vec

function vec(coll) {
  const v = []

  each(coll, v.push.bind(v))

  return v
}


const each  = require('./each')