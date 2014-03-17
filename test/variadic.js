const variadic = require('../lib/variadic')
    , expect   = require('chai').expect
    , slice    = require('../lib/slice')
    , each     = require('../lib/each')
    , src      = require('../lib/src')

describe('variadic', function() {
  describe('when called with a non-function parameter', function() {
    it('should throw a TypeError', function() {
      each(
        [ 1, 0
        , '', 'hello'
        , true, false
        , null, undefined
        ]
        , function(test) {
          expect(function() { variadic(test) }).to.throw(TypeError)
        }
      )
    })
  })

  var verify

  each(
    [ [function(rest) { verify(arguments) }, [1, 2, 3], ['foo', false], [function() {}], []]
    , [function foo(a, b, rest) { verify(arguments) }, [1, 2, 'hello', 'world!'], ['foo', 'bar', 'baz'], [1, 2]]
    ]
    ,
    function(test) {
      const fn = test[0]

      describe('when given `' + src(fn) + '`', function() {
        const varfn = variadic(fn)

        it('should return a function of length ' + (fn.length - 1), function() {
          expect(varfn).to.be.a('function')
          expect(varfn.length).to.equal(fn.length - 1)
        })

        each(test.slice(1), function(args) {
          const argsrc = args.length? '`' + src(args).slice(1, -1) + '`' : 'nothing'

          describe('and when called with ' + argsrc, function() {
            const expHead = slice(args, 0, fn.length - 1)
                , expRest = slice(args, fn.length - 1)

            it('should set rest to `' + src(expRest) + '`', function(done) {
              verify = function(actual) {
                const head = slice(actual, 0, -1)
                    , rest = actual[actual.length - 1]

                expect(head).to.eql(expHead)
                expect(rest).to.eql(expRest)
                done()
              }

              varfn.apply(null, args)
            })
          })
        })
      })
    }
  )
})