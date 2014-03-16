const expect = require('chai').expect
    , each   = require('../lib/each')
    , isFn   = require('../lib/isFn')
    , src    = require('../lib/src')
    

describe('isFn', function() {
  each(
    [ function() {}
    , Function
    , Object
    , String
    , Number
    , Array
    ]
    ,
    function(x) {
      describe('when given `' + src(x) + '`', function() {
        it('should return true', function() {
          expect(isFn(x)).to.be.true
        })
      })
    }
  )

  each(
    [ 0
    , 1
    , 'hello'
    , {}
    , []
    , null
    , undefined
    , true
    , false
    ]
    ,
    function(x) {
      describe('when given `' + src(x) + '`', function() {
        it('should return false', function() {
          expect(isFn(x)).to.be.false
        })
      })
    }
  )
})