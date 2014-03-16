const expect = require('chai').expect
    , count  = require('../lib/count')

describe('count', function() {
  describe('when given an array', function() {
    it('should return its length', function() {
      expect(count([1, 2, 3])).to.equal(3)
    })
  })

  describe('when given an object', function() {
    it('should return the number of enumerable properties', function() {
      expect(count({ foo: 1, bar: 2 })).to.equal(2)
    })

    it('should not care about properties called length', function() {
      expect(count({ length: 5 })).to.equal(1)
    })
  })

  describe('when given a string', function() {
    it('should return its length', function() {
      expect(count('Hello')).to.equal(5)
    })
  })

  describe('when given anything falsy', function() {
    it('should return 0', function() {
      [0, null, undefined, false, ""].forEach(function(falsy) {
        expect(count(falsy)).to.equal(0)
      })
    })
  })
})