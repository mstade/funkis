module.exports = variadic

function variadic(fn) {
  if (!isFn(fn)) throw new TypeError('Parameter `fn` must be a function.')

  const argc  = fn.length - 1
      , argn  = String(fn).replace(argexp, "$1").split(/,\s*/).slice(0, -1)
      , fnsrc = gensrc(fn, argn, argc)

  return eval(fnsrc).bind(fn)
}

const argexp = /function[^\(]*\(([^\)]*)\)(?:\n|.)*/
    , isFn   = require('./isFn')

function gensrc(fn, argn, argc) {
  if (argc) {
    body =
      [ 'const head = [].slice.call(arguments, 0, '+argc+')'
      , '    , tail = [].slice.call(arguments, '+argc+')'
      , 'return this.apply(null, head.concat([tail]))'
      ].join('\n')
  } else {
    body =
      [ 'const rest = [].slice.call(arguments)'
      , 'return this.call(null, rest)'
      ].join('\n')
  }

  const src =
        [ '(function() {'
        , '  var {name} = function {name}({params}) {'
        , '    ' + body.replace(/\n/g, '\n    ')
        , '  }'
        , '  return {name}'
        , '}())'
        ]
        .join('\n')
        .replace(/{name}/g, fn.name || 'variadic')
        .replace(/{params}/g, argn.join(', '))

  return src
}