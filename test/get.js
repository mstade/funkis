const partial = require('../lib/partial')
    , expect  = require('chai').expect
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

    describe('but when `map` does not have `key`', function() {
      it('should return `undefined`', function () {
	const map = { foo : 'wibble' }
	expect(get(map, 'bar')).to.equal(undefined)
      })
    })

    describe('or when `map` is logically false', function() {
      it('should return `undefined`', partial(each, [null, false, undefined], function (nil) {
	expect(get(nil, 'whatever')).to.equal(undefined)
      }))
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

    describe('but when `map` does not have `key`', function() {
      it('should return `notFound`', function () {
	const map  = { foo : 'wibble' }
	expect(get(map, 'bar', nope)).to.equal(nope)
      })
    })

    describe('or when `map` is logically false', function() {
      it('should return `notFound`', partial(each, [null, false, undefined], function (nil) {
	expect(get(nil, 'whatever', nope)).to.equal(nope)
      }))
    })
  })
})