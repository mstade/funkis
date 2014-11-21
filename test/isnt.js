var expect = require('must')
  , isnt   = require('../lib/isnt')
  , each   = require('../lib/each')
  , src    = require('../lib/src')

describe('isnt', function() {
  each(
    [ null
    , false
    , undefined
    ]
    ,
    function(x) {
      describe('when given `' + src(x) + '`', function() {
        it('should return true', function() {
          expect(isnt(x)).to.be.true
        })
      })
    }
  )

  each(
    [ 0
    , ''
    , {}
    , []
    ]
    ,
    function(x) {
      describe('when given `' + src(x) + '`', function() {
        it('should return false', function() {
          expect(isnt(x)).to.be.false
        })
      })
    }
  )
})