var expect = require('must')
  , count  = require('../lib/count')
  , each   = require('../lib/each')
  , take   = require('../lib/take')
  , type   = require('../lib/type')
  , seq    = require('../lib/seq')
  , src    = require('../lib/src')

describe('seq', function() {
  describe('when given an empty sequence or null value', function() {
    it('should return null', function() {
      each(
        [ null
        , undefined
        , []
        , ""
        , {}
        ]
        , function(empty) {
          expect(seq(empty)).to.equal(null)
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
          var s = seq(arr)

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
    , [  { foo : 1,    bar : true,    baz : 'wibble' }
      , [['foo', 1], ['bar', true], ['baz', 'wibble']]
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
      var chr = ['I', 'ñ', 't', 'ë', 'r', 'n', 'â', 't', 'i', 'ô', 'n', 'à', 'l', 'i', 'z', 'æ', 't', 'i', 'ø', 'n', '☃', '💩']
        , str = seq(chr.join(''))

      expect(str.length).to.eql(chr.length)

      var i = 0

      each(str, function(c) {
        expect(c).to.equal(chr[i++])
      })

      expect(i).to.equal(str.length)
    })
  })

  describe('when rest is called', function() {
    it('should return the same instance every time', function() {
      var s = seq([1, 2, 3])

      expect(s.rest).to.equal(s.rest)
      expect(seq.isPrototypeOf(s.rest)).to.be.true
    })
  })

  describe('when called with a next function' , function() {
    it('should behave as a lazy sequence', function() {
      var s = seq(Math.random)

      each(take(5, s), function(n) {
        expect(n).to.be.between(0, 1)
      })
    })
  })

  describe('when called with a next function and valid length `n`', function() {
    it('should automatically end the lazy sequence after `n` iterations', function() {
      var s = seq(Math.random, 3)

      expect(s.length).to.equal(3)
      expect(s.rest.length).to.equal(2)
      expect(s.rest.rest.length).to.equal(1)
      expect(s.rest.rest.rest).to.equal(null)
    })
  })

  describe('when called with a next function that immediately returns `seq.done`', function() {
    var empty = seq(function() { return seq.done })

    it('should have a zero length', function() {
      expect(empty.length).to.equal(0)
    })

    it('should return `null` for first', function() {
      expect(empty.first).to.equal(null)
    })

    it('should return `null` for rest', function() {
      expect(empty.rest).to.equal(null)
    })

    it('should not iterate when calling `next`', function() {
      expect(empty.next()).to.equal(seq.done)
      expect(empty.next()).to.equal(seq.done)
      expect(empty.next()).to.equal(seq.done)
    })
  })

  describe('when next is called', function() {
    var s = seq([1, 2])

    it('should behave as the ES6 iterator protocol', function() {
      each(
        [ { value: s.first } 
        , { value: s.rest.first }
        ]
        , function(test) {
          expect(s.next()).to.eql(test)
        }
      )

      expect(s.next()).to.equal(seq.done)
    })

    describe('and if called after iteration is done', function() {
      it('should automatically rewind and behave the same as before', function() {
        each(
          [ { value: s.first } 
          , { value: s.rest.first }
          ]
          , function(test) {
            expect(s.next()).to.eql(test)
          }
        )

        expect(s.next()).to.equal(seq.done)
      })
    })
  })
})