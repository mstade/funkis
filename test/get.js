const partial = require('../lib/partial')
    , expect  = require('must')
    , each    = require('../lib/each')
    , get     = require('../lib/get')

describe('`get`', function() {
  describe('when given two parameters: `map` and `key`;', function() {
    describe('and when `map` has `key`', function() {
      it('should return its value', function () {
        const map = { foo : 'wibble' }
        expect(get(map, 'foo')).to.equal('wibble')
      })
    })

    describe('and when the value of `map[key]` is logically false', function() {
      it('should still return the value of `key`', function() {
        each([null, undefined, false], function(x) {
          const map = { foo: x }
          expect(get(map, 'foo')).to.equal(x)
        })
      })
    })

    describe('but when `map` does not have `key`', function() {
      it('should return `undefined`', function () {
        const map = { foo : 'wibble' }
        expect(get(map, 'bar')).to.equal(undefined)
      })
    })

    describe('or when `map` is logically false', function() {
      it('should return `undefined`', function() {
        each([null, false, undefined], function(nil) {
          expect(get(nil, 'whatever')).to.equal(undefined)
        })
      })
    })
  })

  describe('when given three parameters: `map`, `key`, and `notFound`;', function() {
    const nope = '¯\(º_o)/¯'

    describe('and when `map` has `key`', function() {
      it('should return its value', function () {
        const map = { foo : 'wibble' }
        expect(get(map, 'foo', nope)).to.equal('wibble')
      })
    })

    describe('and when the value of `key` is logically false', function() {
      it('should still return the value of `key`', function() {
        each([null, undefined, false], function(x) {
          const map = { foo: x }
          expect(get(map, 'foo', nope)).to.equal(x)
        })
      })
    })

    describe('but when `map` does not have `key`', function() {
      it('should return `notFound`', function () {
        const map  = { foo : 'wibble' }
        expect(get(map, 'bar', nope)).to.equal(nope)
      })
    })

    describe('or when `map` is logically false', function() {
      it('should return `notFound`', function() {
        each([null, false, undefined], function(nil) {
          expect(get(nil, 'whatever', nope)).to.equal(nope)
        })
      })
    })
  })

  describe('when given an array as `key`', function() {
    it('should work recursively', function() {
      const map = { a: { b: { c: { d: 'wibble' } } } }
          , notFound = {}

      expect(get(map, ['a', 'b', 'c', 'd'])).to.equal('wibble')
      expect(get(map, ['a', 'b', 'c', 'x'], notFound)).to.equal(notFound)
    })
  })
})