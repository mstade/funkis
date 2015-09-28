const constantly = require('../lib/constantly')
    , expect     = require('must')
    , and        = require('../lib/and')

describe('`and`', function() {
  describe('given zero arguments', function() {
    it('should return `true`', function() {
      expect(and()).to.equal(true)
    })
  })

  describe('given one argument', function() {
    it('should return the value of that argument', function() {
      expect(and(1)).to.equal(1)
      expect(and(0)).to.equal(0)
      expect(and(false)).to.equal(false)
    })

    describe('and when that argument is a function', function() {
      it('should return the value of calling that function', function() {
        expect(and(constantly('wibble'))).to.equal('wibble')
      })
    })
  })

  describe('given two or more arguments', function() {
    describe('when the values of all arguments are logically true', function() {
      it('should return the last supplied value', function() {
        expect(and(0, 1, 2, 3)).to.equal(3)
      })
    })

    describe('when any one argument is logically false', function() {
      it('should return the value that was logically false', function() {
        expect(and(0, null, 1)).to.equal(null)
        expect(and(false, true, 1)).to.equal(false)
        expect(and(0, true, undefined)).to.equal(undefined)
      })
    })

    describe('when an argument is a function', function() {
      it('should call the function and evaluate its return value', function() {
        var called = false

        expect(and(0, function() { return (called = true) }, 1, 'yup')).to.equal('yup')
        expect(called).to.be.true
      })
    })
  })
})