var partial = require('../lib/partial')
  , expect  = require('must')
  , range   = require('../lib/range')
  , nth     = require('../lib/nth')
  , $       = require('../lib/partial')

describe("`nth`", function() {
  describe("when given a seqable object and an index", function() {
    it("should return the item at the given index", function() {
      expect(nth([1, 2, 3], 1)).to.equal(2)
      expect(nth(range(), 1)).to.equal(1)
    })

    it("should throw an error if the index is out of bounds", function() {
      expect($(nth, [1, 2, 3], 3)).to.throw(RangeError)
      expect($(nth, range(3), 5)).to.throw(RangeError)
    })
  })
})