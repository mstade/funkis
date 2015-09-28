describe('call', function() {
  describe('when not given a function', function() {
    it('should throw a TypeError', function() {
      each(
        [ 0
        , 1
        , []
        , {}
        , true
        , false
        , null
        , undefined
        ]
        , function(nonfn) {
          expect(function() {
            call(nonfn)
          }).to.throw(TypeError)
        }
      )
    })
  })

  describe('when given a function `fn`', function() {
    describe('and no arguments', function(done) {
      it('should call the function without arguments', function(done) {      
        var fn = function() {
          expect(arguments.length).to.equal(0)
          done()
        }

        call(fn)
      })

      describe('and `fn` is bound', function() {
        it('should not affect the binding', function(done) {
          var owner = {}

          var fn = function() {
            expect(arguments.length).to.equal(0)
            expect(this).to.equal(owner)
            done()
          }

          call(fn.bind(owner))
        })
      })
    })

    describe('and when given arguments', function(done) {
      it('should call the function with arguments', function(done) {
        var fn = function() {
          expect(slice(arguments)).to.eql([1, true, 'wibble'])
          done()
        }

        call(fn, 1, true, 'wibble')
      })

      describe('and `fn` is bound', function() {
        it('should not affect the binding', function(done) {
          var owner = {}

          var fn = function() {
            expect(slice(arguments)).to.eql([1, true, 'wibble'])
            expect(this).to.equal(owner)
            done()
          }

          call(fn.bind(owner), 1, true, 'wibble')
        })
      })
    })
  })
})

var expect = require('must')
  , slice  = require('../lib/slice')
  , each   = require('../lib/each')
  , call   = require('../lib/call')