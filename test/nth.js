const expect = require('chai').expect
    , thunk  = require('../lib/thunk')
    , nth    = require('../lib/nth')

describe('nth', function() {
  describe('when given a seqable object and an index', function() {
    it('should return the item at the given index', function() {
      expect(nth([1, 2, 3], 1)).to.equal(2)
    })

    it('should throw an error if the index is out of bounds', function() {
      expect(thunk(nth, [1, 2, 3], 3)).to.throw(RangeError)
    })
  })
})