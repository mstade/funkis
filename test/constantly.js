var constantly = require('../lib/constantly')
  , expect     = require('must')
  , each       = require('../lib/each')
  , src        = require('../lib/src')

describe('constantly', function() {
  each(
    [ 0
    , 5
    , true
    , false
    , 'wibble'
    , Function
    ]
    , function(val) {
      describe('when called with the value `' + src(val) + '`', function() {
        var v = constantly(val)

        it('should return a function called `constant`', function() {
          expect(v.name).to.equal('constant')
        })

        describe('that when called with no arguments', function() {
          it('should return the exact same value', function() {
            expect(v()).to.equal(val)
          })
        })

        describe('and when called with some arguments', function() {
          it('should still return the exact same value', function() {
            expect(v(1, 2)).to.equal(val)
            expect(v(true)).to.equal(val)
            expect(v(null)).to.equal(val)
          })
        })
      })
    }
  )
})