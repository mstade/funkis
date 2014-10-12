const constantly = require('../lib/constantly')
    , expect     = require('chai').expect
    , when       = require('../lib/when')

describe('`when`', function() {
  describe('given a `test` and a `body`', function() {
    describe('when `test` is a function', function() {
      describe('and when calling `test` returns logically true', function () {
	describe('when `body` is a function', function() {
	  it('then return the value of calling `body`', function() {
	    const tru = constantly(true)
		, wbl = constantly('wibble')

	    expect(when(tru, wbl)).to.equal('wibble')
	  })
	})

	describe('when `body` is not a function', function() {
	  it('then return `body`', function() {
	    const tru = constantly(true)
	    expect(when(tru, 'wibble')).to.equal('wibble')
	  })
	})
      })

      describe('but when calling `test` returns logically false', function() {
	it('then return `undefined`', function() {
	  const no = constantly(null)
	  expect(when(no, 'wibble')).to.equal.undefined
	})
      })
    })

    describe('when `test` is not a function', function() {
      describe('but when the value is logically true', function() {
	describe('when `body` is a function', function() {
	  it('then return the value of calling `body`', function() {
	    const wbl = constantly('wibble')
	    expect(when(0, wbl)).to.equal('wibble')
	  })
	})

	describe('when `body` is not a function', function() {
	  it('then return `body`', function() {
	    expect(when(1, 'wibble')).to.equal('wibble')
	  })
	})
      })
    })
  })
})