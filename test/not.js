var expect = require('must')
  , each   = require('../lib/each')
  , src    = require('../lib/src')
  , not    = require('../lib/not')

describe('not', function() {
  each(
    [ null
    , false
    , undefined
    ]
    , function(x) {
      describe('when given `'+src(x)+'`', function() {
        it('should return true', function() {
          expect(not(x)).to.be.true
        })
      })
    }
  )

  each(
    [ 0, 1, -1
    , true
    , {}, { foo: 'moo' }
    , [], [,,], [1,2,3]
    , Number, Object, String, Function, function() {}
    ]
    , function(x) {
      describe('when given `'+src(x)+'`', function() {
        it('should return false', function() {
          expect(not(x)).to.be.false
        })
      })
    }
  )
})