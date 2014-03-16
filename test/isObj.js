const expect = require('chai').expect
    , isObj  = require('../lib/isObj')
    , isArr  = require('../lib/isArr')
    , each   = require('../lib/each')
    , str    = require('../lib/str')
    

describe('isObj', function() {
  each(
    [ {}
    , new Object()
    , Object({})
    , [Object(null), 'Object(null)']
    , [Object(undefined), 'Object(undefined)']
    ]
    ,
    function(x) {
      const n = isArr(x)? x[1] : str(x)

      isArr(x) && (x = x[0])

      describe('when given `' + n + '`', function() {
        it('should return true', function() {
          expect(isObj(x)).to.be.true
        })
      })
    }
  )

  each(
    [ NaN
    , 324234
    , ''
    , []
    , true
    , false
    , function() {}
    , '342'
    , null
    , undefined
    , [Object([]), 'Object([])']
    , [Object(''), 'Object("")']
    , [Object('hello'), 'Object("hello")']
    , [Object(0), 'Object(0)']
    , [Object(1), 'Object(1)']
    ]
    ,
    function(x) {
      const n = isArr(x)? x[1] : str(x)

      isArr(x) && (x = x[0])

      describe('when given `' + n + '`', function() {
        it('should return false', function() {
          expect(isObj(x)).to.be.false
        })
      })
    }
  )
})