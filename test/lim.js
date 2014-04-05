const partial = require('../lib/partial')
    , expect  = require('chai').expect
    , each    = require('../lib/each')
    , lim     = require('../lib/lim')
    , nil     = require('../lib/nil')

describe('lim', function() {
  describe('when called with a limit `5` and a function `fn`', function() {
    const ltd = lim(5, function(n) { return n })

    it('should return another function called `ltd`', function() {
      expect(ltd.name).to.equal('ltd')
    })

    it('that should return `nil` after `5` calls', function() {
      each([0, 1, 2, 3, 4], function(n) {
        expect(ltd()).to.equal(n)
      })

      expect(ltd()).to.equal(nil)
    })
  })

  describe('when called with an invalid limit', function() {
    it('should throw a TypeError', function() {
      each([-1, null, true, undefined, [], {}], function(n) {
        expect(partial(lim, n)).to.throw(TypeError)
      })
    })
  })

  describe('when called without a function', function() {
    it('should throw a TypeError', function() {
      each([-1, null, true, undefined, [], {}], function(fn) {
        expect(partial(lim, 5, fn)).to.throw(TypeError)
      })
    })
  })
})