const repeatedly = require('../lib/repeatedly')
    , partial    = require('../lib/partial')
    , expect     = require('chai').expect
    , range      = require('../lib/range')
    , each       = require('../lib/each')
    , nth        = require('../lib/nth')

describe('repeatedly', function() {
  describe('when called with a limit `5` and a function `fn`', function() {
    const calls = repeatedly(5, function(n) { return n })

    it('should return a lazy sequence of `5` calls to `fn`', function() {
      expect(calls.length).to.equal(5)

      each(range(5), function(n) {
        expect(nth(calls, n)).to.equal(n)
      })
    })
  })

  describe('when called with an invalid limit', function() {
    it('should throw a TypeError', function() {
      each([-1, null, true, undefined, [], {}], function(n) {
        expect(partial(repeatedly, n)).to.throw(TypeError)
      })
    })
  })

  describe('when called without a function', function() {
    it('should throw a TypeError', function() {
      each([-1, null, true, undefined, [], {}], function(fn) {
        expect(partial(repeatedly, 5, fn)).to.throw(TypeError)
      })
    })
  })
})