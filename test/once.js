var expect = require('must')
  , once   = require('../lib/once')

describe('once', function() {
  describe('when given a function `fn`', function() {
    var ofn = once(fn)

    it('should return another function named `once`', function() {
      expect(ofn).to.be.a(Function)
      expect(ofn.name).to.equal('once')
    })

    var callcount = 0
      , result

    describe('and when called', function() {
      it('should call `fn`', function() {
        expect(callcount).to.equal(0)
        result = ofn(5)
        expect(callcount).to.equal(1)
        expect(result).to.equal(25)
      })
    })

    describe('but if called again', function() {
      it('should not call `fn`, but return the same value as before', function() {
        expect(ofn(5)).to.equal(25)
        expect(callcount).to.equal(1)
      })

      it('should not call `fn`, even if the parameters change', function() {
        expect(ofn(2)).to.equal(25)
        expect(callcount).to.equal(1)
      })
    })

    function fn(a) {
      if (callcount > 1) {
        throw new Error('Should only be called once!')
      }

      callcount++

      return a * a
    }
  })
})