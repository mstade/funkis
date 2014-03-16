const expect = require('chai').expect
    , thunk  = require('../lib/thunk')
    , isTh   = require('../lib/isTh')
    , each   = require('../lib/each')
    , src    = require('../lib/src')

describe('isTh', function() {
  each(
    [ thunk()
    , thunk(1)
    , thunk(function() {})
    , thunk(function(a, b) {}, 1, 2)
    , function thunk() {}
    ]
    ,
    function(fn) {
      describe('when given `' + src(fn) + '`', function() {
        it('should return true', function() {
          expect(isTh(fn)).to.be.true
        })
      })
    }
  )

  each(
    [ Function
    , function() {}
    , function(a, b) {}
    , function funk() {}
    , function think() {}
    , function thunker() {}
    ]
    ,
    function(fn) {
      describe('when given`' + src(fn) + '`', function() {
        it('should return false', function() {
          expect(isTh(fn)).to.be.false
        })
      })
    }
  )
})