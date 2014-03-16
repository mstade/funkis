const expect = require('chai').expect
    , isStr  = require('../lib/isStr')
    , isArr  = require('../lib/isArr')
    , each   = require('../lib/each')
    , src    = require('../lib/src')
    

describe('isStr', function() {
  each(
    [ ''
    , 'hello'
    , [String({}), 'String({})']
    , [String(null), 'String(null)']
    , [String(undefined), 'String(undefined)']
    , [String([]), 'String([])']
    , [String(''), 'String("")']
    , [String('hello'), 'String("hello")']
    , [String(0), 'String(0)']
    , [String(1), 'String(1)']
    ]
    ,
    function(x) {
      const n = isArr(x)? x[1] : src(x)

      isArr(x) && (x = x[0])

      describe('when given `' + n + '`', function() {
        it('should return true', function() {
          expect(isStr(x)).to.be.true
        })
      })
    }
  )

  each(
    [ NaN
    , 324234
    , {}
    , []
    , true
    , false
    , function() {}
    , null
    , undefined
    ]
    ,
    function(x) {
      describe('when given `' + src(x) + '`', function() {
        it('should return false', function() {
          expect(isStr(x)).to.be.false
        })
      })
    }
  )
})