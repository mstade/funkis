const expect = require('chai').expect
    , count  = require('../lib/count')
    , seq    = require('../lib/seq')
    , nil    = require('../lib/nil')

describe('count', function() {
  describe('when given an uncountable object', function() {
    it('should throw a TypeError', function() {
      expect(function() {
        count(false)
      }).to.throw(TypeError)
    })
  })

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

  describe('when given an arguments object', function() {
    it('should return its length', function(done) {
      expect(count(arguments)).to.equal(1)
      done()
    })
  })

  describe('when given a seq', function () {
    describe('and when the seq length is defined', function() {
      it('should return it', function() {
        const s = seq([1, 2, 3])
        expect(count(s)).to.equal(3)
      })
    })

    describe('but when the seq length is undefined', function() {
      it('should try to count it', function() {
        const s = seq(0, next)
        expect(count(s)).to.equal(5)

        function next() {
          const n = this + 1
          return n < 5? n : nil
        }
      })
    })
  })

  describe('when given anything empty', function() {
    it('should return 0', function() {
      [0, null, undefined, "", [], {}].forEach(function(falsy) {
        expect(count(falsy)).to.equal(0)
      })
    })
  })
})