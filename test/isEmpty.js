var isEmpty = require('../lib/isEmpty')
  , expect  = require('must')
  , each    = require('../lib/each')
  , seq     = require('../lib/seq')
  , src     = require('../lib/src')

describe('isEmpty', function() {
  each(
    [ 0
    , ''
    , []
    , {}
    , null
    , undefined
    ]
    ,
    function(x) {
      describe('when given `' + src(x) + '`', function() {
        it('should return true', function() {
          expect(isEmpty(x)).to.be.true
        })
      })
    }
  )

  each(
    [ 1
    , '1'
    , { foo: 1 }
    , [null]
    , seq([1, 2])
    ]
    ,
    function(x) {
      describe('when given `' + src(x) + '`', function() {
        it('should return false', function() {
          expect(isEmpty(x)).to.be.false
        })
      })
    }
  )
})