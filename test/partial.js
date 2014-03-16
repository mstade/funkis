const partial = require('../lib/partial')
    , expect  = require('chai').expect

describe('partial', function() {
  describe('when given a function and no other arguments', function() {
    it('should just return the same function', function() {
      const fun = partial(test)

      expect(fun).to.equal(test)

      function test(a, b) {}
    })
  })

  describe('when given a function and some parameters', function() {
    it('should return a partially applied function', function() {
      expect(test(2, 2)).to.equal(4)
      
      const fun = partial(test, 2)

      expect(fun.name).to.equal('partial')
      expect(fun(2)).to.equal(4)

      function test(a, b) { return a + b }
    })
  })
})