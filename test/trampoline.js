var trampoline = require('../lib/trampoline')
  , expect     = require('must')
  , thunk      = require('../lib/thunk')
  , each       = require('../lib/each')

describe('trampoline', function() {
  describe('when given a non-function `fn` parameter', function() {
    it('should return the value of `fn`', function() {
      each(
        [ 0, 1
        , [], {}
        , true, false
        , '', 'wibble'
        , null, undefined
        ]
        , function(test) {
          expect(trampoline(test)).to.equal(test)    
        }
      )
    })
  })

  describe('when given a factorial function', function() {
    it('should trampoline it!', function() {
      var facts = []
      
      each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function(n) {
        facts.push(factorial(n))
      })

      expect(facts).to.eql([1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800])

      function factorial(n) {
        function calc(acc, n) {
          if (n) {
            return thunk(calc, acc * n, n - 1)
          } else {
            return acc
          }
        }

        return trampoline(calc, 1, n)
      }
    })
  })
})