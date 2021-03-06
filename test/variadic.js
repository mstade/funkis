var variadic = require('../lib/variadic')
  , expect   = require('must')
  , thunk    = require('../lib/thunk')
  , range    = require('../lib/range')
  , slice    = require('../lib/slice')
  , each     = require('../lib/each')
  , src      = require('../lib/src')
  , is       = require('../lib/is')

describe('`variadic`', function() {
  describe('given an argument `fn`', function() {
    describe('when it is not a function', function() {
      it('should throw a `TypeError`', function() {
        each(
          [ 1, 0
          , '', 'hello'
          , true, false
          , null, undefined
          ]
          , function(fn) {

            expect(function() { variadic(fn) }).to.throw(TypeError)
          }
        )
      })
    })

    describe('when it is a function', function() {
      describe('of arity 0', function() {
        it('should just return `fn`', function() {
          var fn = function() {}
          expect(variadic(fn)).to.equal(fn)
        })
      })

      describe('of arity 1', function() {

        it('should return a 1-arity function', function() {
          var fn = variadic(function(rest) {})
          expect(fn).to.have.length(1)
        })

        describe('when called without arguments', function() {
          it('should set `rest` to an empty array', function(done) {
            var fn = variadic(function(rest) {
              is(Array, rest) && expect(rest).to.have.length(0)
              done()
            })

            fn()
          })
        })
      })

      each(range(1, 28), function(n) {
        describe('of arity '+n, function() {
          var sig = slice('abcdefghijklmnopqrstuvwxyz', 0, n - 1).concat('rest')

          it('should return a '+n+' arity function', function() {
            var fn = Function.apply(Function, sig.concat('return'))

            expect(fn).to.have.length(n)
            expect(variadic(fn)).to.have.length(n)
          })

          describe('that when called with fewer than '+n+' arguments', function() {
            it('should leave `rest` an empty array', function() {
              var args = slice(sig, 0, -1)

              while (args.length) {
                var fn = Function.apply(Function, sig.concat(
                  [ 'this.expect(arguments).to.have.length('+sig.length+')'
                  , 'this.expect(rest).to.be.empty'
                  ].join('\n')
                ))

                variadic(fn).apply({ expect: expect }, args)
                args = slice(args, 0, -1)
              }
            })
          })

          describe('but when called with '+n+' arguments', function() {
            it('should put the last argument in `rest`', function() {
              var args = slice(sig, 0, -1).concat('wibble')

              var fn = Function.apply(Function, sig.concat(
                [ 'this.expect(arguments).to.have.length('+n+')'
                , 'this.expect(rest).to.have.length(1)'
                , 'this.expect(rest).to.contain("wibble")'
                ].join('\n')
              ))

              variadic(fn).apply({ expect: expect }, args)
            })
          })

          describe('and when called with more than '+n+' arguments', function() {
            it('should put all variadic arguments in `rest`', function() {
              var args = slice(sig, 0, -1).concat('wibble', 'wobble', 'bob')

              var fn = Function.apply(Function, sig.concat(
                [ 'this.expect(arguments).to.have.length('+n+')'
                , 'this.expect(rest).to.have.length(3)'
                , 'this.expect(rest).to.eql(["wibble", "wobble", "bob"])'
                ].join('\n')
              ))

              variadic(fn).apply({ expect: expect }, args)
            })
          })
        })
      })
    })
  })
})