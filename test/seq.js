const expect = require('chai').expect
    , each   = require('../lib/each')
    , type   = require('../lib/type')
    , seq    = require('../lib/seq')

describe('seq', function() {
  describe('when given an empty sequence or null value', function() {
    it('should return null', function() {
      [null, undefined, [], "", {}].forEach(function(empty) {
        expect(seq(empty)).to.equal(null)
      })
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
        const s = seq(t[0])

        it('should return a sequence', function() {
          expect(s).to.eql(t[1])
        })
      })
    }
  )

  describe('when calling `type` on a sequence', function() {
    it('should return `seq` by calling `typeOf`', function() {
      const s = seq([1, 2, 3])

      expect(type(s)).to.eql('seq')
    })
  })

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
})