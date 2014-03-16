const expect = require('chai').expect
    , each   = require('../lib/each')
    , spy    = require('sinon').spy

require('chai').use(require('sinon-chai'))
require('mocha-sinon')

describe('each', function() {
  describe('when given an array', function() {
    it('should call the supplied callback for each item', function() {
      const callee = spy()

      each([1, 2, 3, 4, 5], callee)

      expect(callee).to.have.callCount(5)
      expect(callee.args).to.eql([[1], [2], [3], [4], [5]])
    })
  })

  describe('when given an object', function() {
    it('should call the supplied callback for each enumerable property', function() {
      const callee = spy()

      each({ foo: 1, bar: true, baz: 'wibble' }, callee)

      expect(callee).to.have.callCount(3)
      expect(callee.args).to.eql([ [{foo: 1}], [{bar: true}], [{baz: 'wibble'}] ])
    })
  })
})