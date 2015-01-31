var constantly = require('../lib/constantly')
  , expect     = require('must')
  , range      = require('../lib/range')
  , each       = require('../lib/each')
  , inc        = require('../lib/inc')
  , $          = require('../lib/partial')

describe('inc', function() {
  describe('when given a number `n`', function() {
    it('should increment that number by one and return the result', function() {
      each(range(100), function(n) {
	expect(inc(n)).to.equal(n + 1)
      })
    })
  })

  describe('when given a function', function() {
    it('should call the function and try to increment the return value', function() {
      var three = constantly(3)
      expect(inc(three)).to.equal(4)
    })
  })

  describe('when given a value that is not a number', function() {
    it('should throw', function() {
      each([ 'foo', true, false, null, undefined, NaN ], function(x) {
	expect($(inc, x)).to.throw()
      })
    })
  })
})