const expect = require('chai').expect
    , eq     = require('../lib/eq')

describe('eq', function() {
  describe('given two numbers', function() {
    it('should do a fuzzy comparison', function() {
      // TODO: is this a valid test?
      expect(eq(1, 1 + 2e-17)).to.be.ok
    })

    it('should not be confused by signs', function() {
      expect(eq(1, -1)).to.not.be.ok
      expect(eq(0, -0)).to.be.ok
    })
  })
})