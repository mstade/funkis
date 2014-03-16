const expect = require('chai').expect
    , isArr  = require('../lib/isArr')
    , each   = require('../lib/each')
    , src    = require('../lib/src')
    

describe('isArr', function() {
  each(
    [ []
    , [1, 2, 3]
    , [ [], [], [] ]
    ]
    ,
    function(x) {
      describe('when given `' + src(x) + '`', function() {
        it('should return true', function() {
          expect(isArr(x)).to.be.true
        })
      })
    }
  )

  each(
    [ 0
    , 1
    , 'hello'
    , {}
    , null
    , undefined
    , true
    , false
    ]
    ,
    function(x) {
      describe('when given `' + src(x) + '`', function() {
        it('should return false', function() {
          expect(isArr(x)).to.be.false
        })
      })
    }
  )
})