const expect = require('chai').expect
    , each   = require('../lib/each')
    , type   = require('../lib/type')
    , seq    = require('../lib/seq')
    , nil    = require('../lib/nil')

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
      describe('when given the ' + type(t[0]) + ': ' + t[0], function() {
        var s = seq(t[0])

        it('should return a sequence', function() {
          var i = 0

          each(s, function(d) {
            expect(d).to.eql(t[1][i++])
          })

          expect(i).to.equal(s.length)
        })
      })
    }
  )

  each(
    [ true
    , false
    , 1
    , 0
    ], function(test) {
      describe('when given a ' + type(test), function() {
        it('should throw an error', function() {
          expect(function() { seq(test) }).to.throw(TypeError)
        })
      })
    }
  )

  describe('when given a string with unicode shenanigans', function() {
    it('should make a sequence of characters where pairs are considered', function() {
      const chr = ['I', 'ñ', 't', 'ë', 'r', 'n', 'â', 't', 'i', 'ô', 'n', 'à', 'l', 'i', 'z', 'æ', 't', 'i', 'ø', 'n', '☃', '💩']
          , str = seq(chr.join(''))

      expect(str.length).to.eql(22)

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

      expect(s.tail()).to.equal(s.tail())
    })
  })

  describe('when called with a next function' , function() {
    it('should behave as a lazy sequence', function() {
      var s = seq(0, next)
        , n = 0

      function next() {
        return this + 1
      }

      expect(s.length).to.equal(undefined)

      do {
        expect(s.head()).to.equal(n)
        s = s.tail()
      } while (++n < 5)

      expect(n).to.equal(5)
    })

    describe('and when also given a length', function() {
      const range = seq(0, next, 5)

      var callcount = 0

      function next() {
        callcount++
        return this + 1
      }

      it('should report the length', function() {
        expect(range.length).to.equal(5)
      })

      it('should decrement the length for each call to `tail`', function() {
        expect(range.tail().length).to.equal(4)
      })

      it('should still be lazy', function() {
        expect(callcount).to.equal(1)
      })

      it('should automatically stop the sequence', function() {
        const trail = []

        each(range, trail.push.bind(trail))

        expect(trail).to.eql([0, 1, 2, 3, 4])
      })
    })
  })
})