var expect = require('must')
  , every  = require('../lib/every')
  , each   = require('../lib/each')
  , src    = require('../lib/src')
  , seq    = require('../lib/seq')

describe('every', function() {
  describe('when given a seq', function() {
    it('should call `fn` so long as it keeps returning `true`', function() {
      var l = [1, 2, 3]
        , s = seq(l)

      var i = 0

      var fn = function(x) {
        expect(x).to.equal(l[i++])
        return true
      }

      every(s, fn)
      expect(i).to.equal(l.length)
    })

    it('should stop calling `fn` when it returns `false`', function() {
      var l = [1, 2, 3]
        , s = seq(l)

      var i = 0

      var fn = function(x) {
        if (x < 3) {
          expect(x).to.equal(l[i++])
          return true
        }
      }

      every(s, fn)
      expect(i).to.equal(2)
    })
  })

  describe('when given an empty sequence', function() {
    it('should do nothing', function() {
      var fn = function(x) { throw new Error("shouldn't get here!") }
      each(null, fn)
    })
  })
})