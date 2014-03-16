module.exports = count

function count(seq) {
  if (!seq) return 0

  const t = type(seq)

  if (t === 'string' ||  t === 'array') return seq.length
  
  return keys(seq).length  
}

const type = require('./type')
    , keys = Object.keys
    , abs  = Math.abs