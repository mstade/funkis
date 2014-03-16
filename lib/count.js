module.exports = count

function count(seq) {
  if (!seq) return 0

  const t = type(seq)

  if (t === 'string' ||  t === 'array') return seq.length
  if (t === 'object') return Object.keys(seq).length

  
}

const type = require('./type')
    , abs  = Math.abs