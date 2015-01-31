var constantly = require('../lib/constantly')
  , expect     = require('must')
  , range      = require('../lib/range')
  , each       = require('../lib/each')
  , dec        = require('../lib/dec')
  , $          = require('../lib/partial')

describe('dec', function() {
  describe('when given a number `n`', function() {
    it('should decrement that number by one and return the result', function() {
      each(range(100), function(n) {
	expect(dec(n)).to.equal(n - 1)
      })
    })
  })

  describe('when given a function', function() {
    it('should call the function and try to decrement the return value', function() {
      var three = constantly(3)
      expect(dec(three)).to.equal(2)
    })
  })

  describe('when given a value that is not a number', function() {
    it('should throw', function() {
      each([ 'foo', true, false, null, undefined, NaN ], function(x) {
	expect($(dec, x)).to.throw()
      })
    })
  })
})