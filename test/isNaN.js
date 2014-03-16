const expect = require('chai').expect
    , isNaN  = require('../lib/isNaN')
    , each   = require('../lib/each')
    , str    = require('../lib/str')
    

describe('isNaN', function() {
  describe('when given `NaN`', function() {
    it('should return true', function() {
      expect(isNaN(NaN)).to.be.true
    })
  })

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
      describe('when given `' + str(x) + '`', function() {
        it('should return false', function() {
          expect(isNaN(x)).to.be.false
        })
      })
    }
  )
})