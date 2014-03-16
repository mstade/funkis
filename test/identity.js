const identity = require('../lib/identity')
    , expect   = require('chai').expect
    , each     = require('../lib/each')
    , type     = require('../lib/type')
    , PI       = Math.PI

describe('identity', function() {
  each(
  [ 1
  , PI
  , {}
  , []
  , function() {}
  , undefined
  , null
  , NaN
  , 'hello'
  ]
  , function(x) {
    const str = (type(x) === 'array' || type(x) === 'object')? JSON.stringify(x) : x + ''

    describe('when given `' + str + '`', function() {
      it('should return `' + str + '`', function() {
        const id = identity(x)

        if (x !== x) { // NaN *sigh*
          expect(id).to.not.equal(id)
        } else {
          expect(id).to.equal(x)
        }
      })
    })
  })
})