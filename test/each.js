var expect = require('must')
  , each   = require('../lib/each')
  , src    = require('../lib/src')
  , seq    = require('../lib/seq')

describe('each', function() {
  describe('when given a seq', function() {
    it('should call `fn` once for each item', function() {
      var l = [1, 2, 3]
          , s = seq(l)

      var i = 0

      var fn = function(x) {
        expect(x).to.equal(l[i++])
      }

      each(s, fn)
      expect(i).to.equal(l.length)
    })
  })

  each(
    [ [1, 2, 3, 4, 5]
    , [[1, 2], [4, 5]]
    ]
    , function(test) {
      describe('when given `' + src(test).slice(1, -1) + '`', function() {
        describe('and the function `fn`', function() {
          var i = 0

          var fn = function(x) {
            expect(x).to.equal(test[i++])
          }

          var times = test.length + ' time' + (test.length > 1? 's' : '')

          it('should call `fn` ' + times +'; once for each item', function() {
            each(test, fn)
            expect(i).to.equal(test.length)
          })
        })
      })
    }
  )

  var obj = { foo: 1, bar: true, baz: 'wibble' }

  describe('when given `' + src(obj) + '`', function() {
    describe('and the function `fn`', function() {
      var prop = [['foo', 1], ['bar', true], ['baz', 'wibble']]

      var i = 0

      var fn = function(x) {
        expect(x).to.eql(prop[i++])
      }

      it('should call `fn` 3 times; once for each enumerable property', function() {
        each(obj, fn)
        expect(i).to.equal(3)
      })
    })
  })

  describe('when given an empty sequence', function() {
    it('should do nothing', function() {
      var fn = function(x) { throw new Error("shouldn't get here!") }
      each(null, fn)
    })
  })
})