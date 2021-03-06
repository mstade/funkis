module.exports = variadic

function variadic(fn) {
  if (isnt(Function, fn)) throw new TypeError('Parameter `fn` must be a function.')
  
  var argc = fn.length - 1

  switch (argc) {
    case -1 : return fn
    case  0 : return function (rest) { return apply(fn, this, argc, arguments) }
    case  1 : return function (a, rest) { return apply(fn, this, argc, arguments) }
    case  2 : return function (a, b, rest) { return apply(fn, this, argc, arguments) }
    case  3 : return function (a, b, c, rest) { return apply(fn, this, argc, arguments) }
    case  4 : return function (a, b, c, d, rest) { return apply(fn, this, argc, arguments) }
    case  5 : return function (a, b, c, d, e, rest) { return apply(fn, this, argc, arguments) }
    case  6 : return function (a, b, c, d, e, f, rest) { return apply(fn, this, argc, arguments) }
    case  7 : return function (a, b, c, d, e, f, g, rest) { return apply(fn, this, argc, arguments) }
    case  8 : return function (a, b, c, d, e, f, g, h, rest) { return apply(fn, this, argc, arguments) }
    case  9 : return function (a, b, c, d, e, f, g, h, i, rest) { return apply(fn, this, argc, arguments) }
    case 10 : return function (a, b, c, d, e, f, g, h, i, j, rest) { return apply(fn, this, argc, arguments) }
    case 11 : return function (a, b, c, d, e, f, g, h, i, j, k, rest) { return apply(fn, this, argc, arguments) }
    case 12 : return function (a, b, c, d, e, f, g, h, i, j, k, l, rest) { return apply(fn, this, argc, arguments) }
    case 13 : return function (a, b, c, d, e, f, g, h, i, j, k, l, m, rest) { return apply(fn, this, argc, arguments) }
    case 14 : return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, rest) { return apply(fn, this, argc, arguments) }
    case 15 : return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, rest) { return apply(fn, this, argc, arguments) }
    case 16 : return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, rest) { return apply(fn, this, argc, arguments) }
    case 17 : return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, rest) { return apply(fn, this, argc, arguments) }
    case 18 : return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, rest) { return apply(fn, this, argc, arguments) }
    case 19 : return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, rest) { return apply(fn, this, argc, arguments) }
    case 20 : return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, rest) { return apply(fn, this, argc, arguments) }
    case 21 : return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, rest) { return apply(fn, this, argc, arguments) }
    case 22 : return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, rest) { return apply(fn, this, argc, arguments) }
    case 23 : return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, rest) { return apply(fn, this, argc, arguments) }
    case 24 : return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, rest) { return apply(fn, this, argc, arguments) }
    case 25 : return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, rest) { return apply(fn, this, argc, arguments) }
    default : return function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, rest) { return apply(fn, this, argc, arguments) }
  }
}

function apply(fn, host, argc, argv) {
  var rest = []

  if (argv.length < argc) {
    argv = slice(argv).concat(Array(argc - argv.length))
  } else {
    rest = slice(argv, argc)
    argv = slice(argv, 0, argc)
  }

  argv.push(rest)

  return fn.apply(host, argv)
}

var isEmpty = require('./isEmpty')
  , slice   = require('./slice')
  , isnt    = require('./isnt')
  , min     = require('./min')
  , max     = Math.max