const expect = require('chai').expect
    , count  = require('../lib/count')
    , each   = require('../lib/each')
    , take   = require('../lib/take')
    , type   = require('../lib/type')
    , seq    = require('../lib/seq')
    , nil    = require('../lib/nil')
    , src    = require('../lib/src')

describe('seq', function() {
  describe('when given an empty sequence or null value', function() {
    it('should return nil', function() {
      each(
        [ null
        , undefined
        , []
        , ""
        , {}
        ]
        , function(empty) {
          expect(seq(empty)).to.equal(nil)
        }
      )
    })
  })

  describe('when a sequence contains null or undefined', function() {
    it('should not treat it as the end of the sequence', function() {
      each(
        [ [1, null, 2]
        , [1, undefined, 2]
        , [null]
        , [undefined]
        ]
        , function(arr) {
          const s = seq(arr)

          var i = 0

          each(s, function(d) {
            expect(d).to.equal(arr[i++])
          })
        }
      )
    })
  })

  each(
    [ [ [1, 2, 3, 4, 5]
      , [1, 2, 3, 4, 5] 
      ]
    , [   { foo: 1,     bar: true,     baz: 'wibble' }
      , [ { foo: 1 }, { bar: true }, { baz: 'wibble' } ]
      ]
    , [  'H'+'e'+'l'+'l'+'o'
      , ['H','e','l','l','o']
      ]
    ], function(t) {
      describe('when given the ' + type(t[0]) + ': ' + src(t[0]), function() {
        var s = seq(t[0])

        it('should return an equivalent sequence', function() {
          var i = 0

          each(s, function(d) {
            expect(d).to.eql(t[1][i++])
          })

          expect(s.length).to.equal(t[1].length)
        })
      })
    }
  )

  each(
    [ true
    , 666
    ], function(test) {
      describe('when given a ' + type(test), function() {
        it('should throw an error', function() {
          expect(function() { seq(test) }).to.throw(TypeError)
        })
      })
    }
  )

  describe('when given a string with unicode shenanigans', function() {
    it('should make a sequence of characters where code pairs are considered', function() {
      const chr = ['I', 'ñ', 't', 'ë', 'r', 'n', 'â', 't', 'i', 'ô', 'n', 'à', 'l', 'i', 'z', 'æ', 't', 'i', 'ø', 'n', '☃', '💩']
          , str = seq(chr.join(''))

      expect(str.length).to.eql(chr.length)

      var i = 0

      each(str, function(c) {
        expect(c).to.equal(chr[i++])
      })

      expect(i).to.equal(str.length)
    })
  })

  describe('when tail is called', function() {
    it('should return the same instance every time', function() {
      const s = seq([1, 2, 3])

      expect(s.tail).to.equal(s.tail)
    })
  })

  describe('when called with a next function' , function() {
    it('should behave as a lazy sequence', function() {
      var s = seq(Math.random)

      each(take(5, s), function(n) {
        expect(n).to.be.within(0, 1)
      })
    })
  })
})