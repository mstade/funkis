var expect = require('chai').expect
  , each   = require('../lib/each')
  , eq     = require('../lib/eq')

describe('eq', function() {
  describe('given two numbers', function() {
    it('should do a fuzzy comparison', function() {
      // TODO: is this a valid test?
      expect(eq(1, 1 + 2e-17)).to.be.ok
    })

    it('should not be confused by signs', function() {
      expect(eq(1, -1)).to.not.be.ok
      expect(eq(0, -0)).to.be.ok
    })
  })

  each(
    [ [[1, 2, 3], false]
    , [[1, 1, 1], true ]
    , [['a', true, 0], false]
    , [['a', 'a', 'a'], true]
    , [[{}, {}, {}], false]
    ], function(test) {
      describe('when given ' + test[0], function() {
        it('should return ' + test[1], function() {
          expect(eq.apply(null, test[0])).to.equal(test[1])
        })
      })
  })
})