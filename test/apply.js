describe('apply', function() {
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
            apply(nonfn)
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

        apply(fn)
      })

      it('should proxy the functions return value', function() {
        expect(apply(constantly(3))).to.equal(3)
      })

      describe('and `fn` is bound', function() {
        it('should not affect the binding', function(done) {
          var owner = {}

          var fn = function() {
            expect(arguments.length).to.equal(0)
            expect(this).to.equal(owner)
            done()
          }

          apply(fn.bind(owner))
        })
      })
    })

    describe('and when given arguments', function(done) {
      it('should call the function with arguments', function(done) {
        var fn = function() {
          expect(slice(arguments)).to.eql([1, true, 'wibble'])
          done()
        }

        apply(fn, [1, true, 'wibble'])
      })

      it('should proxy the functions return value', function() {
        expect(apply(constantly, [3])).to.be.a(Function)
      })

      describe('and `fn` is bound', function() {
        it('should not affect the binding', function(done) {
          var owner = {}

          var fn = function() {
            expect(slice(arguments)).to.eql([1, true, 'wibble'])
            expect(this).to.equal(owner)
            done()
          }

          apply(fn.bind(owner), [1, true, 'wibble'])
        })
      })
    })
  })
})

var constantly = require('../lib/constantly')
  , expect     = require('must')
  , slice      = require('../lib/slice')
  , apply      = require('../lib/apply')
  , each       = require('../lib/each')
