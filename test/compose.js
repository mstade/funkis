var partial = require('../lib/partial')
  , expect  = require('must')
  , comp    = require('../lib/compose')

describe('compose', function() {
  describe('when given the two functions `a` and `b`, in that order', function() {
    var a = function(x) { return x * 2 }
      , b = function(x) { return x + 2 }
      , c = comp(a, b)

    it('should return a function called `composition`', function() {
      expect(c.name).to.equal('composition')
    })

    it('should return the result of `a(b(x))` where `x` is an initial value', function() {
      expect(c(4)).to.equal(12)
    })
  })

  describe('when given a non-function argument', function() {
    it('should throw a TypeError', function() {
      expect(partial(comp, Function, null)).to.throw(TypeError)
    })
  })
})