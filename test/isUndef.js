const isUndef = require('../lib/isUndef')
    , expect  = require('chai').expect
    , each   = require('../lib/each')
    , str    = require('../lib/str')
    

describe('isUndef', function() {
  describe('when given `undefined`', function() {
    it('should return true', function() {
      expect(isUndef(undefined)).to.be.true
    })
  })

  each(
    [ NaN
    , 0
    , {}
    , []
    , true
    , false
    , function() {}
    , null
    ]
    ,
    function(x) {
      describe('when given `' + str(x) + '`', function() {
        it('should return false', function() {
          expect(isUndef(x)).to.be.false
        })
      })
    }
  )
})