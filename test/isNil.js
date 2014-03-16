const expect = require('chai').expect
    , isNil  = require('../lib/isNil')
    , each   = require('../lib/each')
    , str    = require('../lib/str')
    

describe('isNil', function() {
  each(
    [ null
    , undefined
    ]
    ,
    function(x) {
      describe('when given `' + str(x) + '`', function() {
        it('should return true', function() {
          expect(isNil(x)).to.be.true
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
      describe('when given `' + str(x) + '`', function() {
        it('should return false', function() {
          expect(isNil(x)).to.be.false
        })
      })
    }
  )
})