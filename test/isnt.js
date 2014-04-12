const expect = require('chai').expect
    , isnt   = require('../lib/isnt')
    , each   = require('../lib/each')
    , src    = require('../lib/src')

describe('isnt', function() {
  each(
    [ null
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
    , false
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