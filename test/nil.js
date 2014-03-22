describe('nil', function() {
  it('should be a function', function() {
    expect(nil).to.be.a('function')
  })

  it('should be called `nil`', function() {
    expect(nil.name).to.equal('nil')
  })

  it('should be frozen', function() {
    expect(Object.isFrozen(nil)).to.be.true
  })

  describe('when called', function() {
    it('should return itself', function() {
      expect(nil()).to.equal(nil)
    })
  })

  describe('when coerced into a string', function() {
    it('should be empty', function() {
      expect(nil.toString()).to.equal('')
      expect(String(nil)).to.equal('')
      expect(nil + '').to.equal('')
    })
  })

  describe('when coerced into a value', function() {
    it('should return itself', function() {
      expect(nil.valueOf()).to.equal(nil)
    })
  })
})

const expect = require('chai').expect
    , nil    = require('../lib/nil')