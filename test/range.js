describe('range', function() {
  describe('when not given any arguments', function() {
    it('should return a lazy sequence of all natural numbers', function() {
      var r = range()

      expect(r.length).to.equal(Infinity)
      expect(vec(take(5, r))).to.eql([0, 1, 2, 3, 4])
    })
  })

  describe('when given one argument: `end`', function() {
    it('should return a lazy sequence of numbers from 0 to `end` (exclusive)', function() {
      var r = range(5)

      expect(r.length).to.equal(5)
      expect(vec(r)).to.eql([0, 1, 2, 3, 4])
    })
  })

  describe('when given two arguments: `start` and `end`', function() {
    it('should return a lazy sequence of numbers from `start` (inclusive) to `end` (exclusive)', function() {
      var r = range(-5, 0)

      expect(r.length).to.equal(5)
      expect(vec(r)).to.eql([-5, -4, -3, -2, -1])
    })
  })

  describe('when given three arguments: `start`, `end`, and `step`', function() {
    it('should return use `step` as the increment', function() {
      var r = range(0, 5, 0.5)

      expect(r.length).to.equal(10)
      expect(vec(r)).to.eql([0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5])
    })
  })

  describe('when given an invalid `start` value', function() {
    it('should throw a TypeError', function() {
      expect(function() {
        range(false, 5)
      }).to.throw(TypeError)
    })
  })

  describe('when given an invalid `end` value', function() {
    it('should throw a TypeError', function() {
      expect(function() {
        range(false)
      }).to.throw(TypeError)

      expect(function() {
        range(5, false)
      }).to.throw(TypeError)
    })
  })

  describe('when given an invalid `step` value', function() {
    it('should throw a TypeError', function() {
      expect(function() {
        range(0, 5, null)
      }).to.throw(TypeError)
    })
  })
})

var expect = require('must')
  , range  = require('../lib/range')
  , each   = require('../lib/each')
  , take   = require('../lib/take')
  , vec    = require('../lib/vec')