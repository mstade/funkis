const isEmpty = require('../lib/isEmpty')
    , expect  = require('chai').expect
    , each    = require('../lib/each')
    , seq     = require('../lib/seq')
    , src     = require('../lib/src')
    , nil     = require('../lib/nil')

describe('isEmpty', function() {
  each(
    [ 0
    , ''
    , []
    , {}
    , nil
    , null
    , undefined
    , seq(nil, nil, 0)
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