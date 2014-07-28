const constantly = require('../lib/constantly')
    , expect     = require('chai').expect
    , type       = require('../lib/type')
    , val        = require('../lib/val')

describe('`val`', function() {
  describe('given a value `x`', function() {
    describe('when `x` is a function', function() {
      it('should return the value of calling `x`', function() {
        const three = constantly(3)

        expect(type(three)).to.equal('function')
        expect(val(three)).to.equal(3)
      })
    })

    describe('when `x` is not a function', function() {
      it('should return `x`', function() {
        const x = {}

        expect(type(x)).to.not.equal('function')
        expect(val(x)).to.equal(x)
      })
    })
  })
})