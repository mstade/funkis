var partial = require('../lib/partial')
  , expect  = require('must')
  , slice   = require('../lib/slice')
  , each    = require('../lib/each')
  , take    = require('../lib/take')
  , vec     = require('../lib/vec')
  , src     = require('../lib/src')

describe('take', function() {
  describe('when given a positive number `n`', function() {
    each(
      [ [1, 2, 3, 4, 5, 6]
      , [1, 2]
      , []
      ]
      , function(coll) {
        describe('and when given the collection `' + src(coll) + '`', function() {
          it('should return a lazy sequence of the first `n` items', function() {
	    var s = take(3, coll)

            expect(vec(s)).to.eql(slice(coll, 0, 3))
          })
        })
      }
    )
  })

  describe('when called with an invalid limit', function() {
    it('should throw a TypeError', function() {
      each([null, true, undefined, [], {}], function(n) {
        expect(partial(take, n)).to.throw(TypeError)
      })
    })
  })
})