var identity = require('../lib/identity')
  , expect   = require('must')
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
    var str = (type(x) === 'array' || type(x) === 'object')? JSON.stringify(x) : x + ''

    describe('when given `' + str + '`', function() {
      it('should return `' + str + '`', function() {
        var id = identity(x)

        if (x !== x) { // NaN *sigh*
          expect(id).to.not.equal(id)
        } else {
          expect(id).to.equal(x)
        }
      })
    })
  })
})