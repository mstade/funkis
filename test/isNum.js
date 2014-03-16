const expect = require('chai').expect
    , isNum  = require('../lib/isNum')
    , isArr  = require('../lib/isArr')
    , each   = require('../lib/each')
    , str    = require('../lib/str')
    

describe('isNum', function() {
  each(
    [ 0
    , 1
    , Math.PI
    , Infinity
    , -Infinity
    , Number.MAX_VALUE
    , Number.MIN_VALUE
    , [1e34, '1e34']
    , [0e-34, '0e-34']
    , [09, '09']
    , [0x8393, '0x8393']
    ]
    ,
    function(x) {
      const n = isArr(x)? x[1] : str(x)

      isArr(x) && (x = x[0])

      describe('when given `' + n + '`', function() {
        it('should return true', function() {
          expect(isNum(x)).to.be.true
        })
      })
    }
  )

  each(
    [ NaN
    , ''
    , {}
    , []
    , false
    , function() {}
    , '342'
    ]
    ,
    function(x) {
      describe('when given `' + str(x) + '`', function() {
        it('should return false', function() {
          expect(isNum(x)).to.be.false
        })
      })
    }
  )
})