const expect = require('chai').expect
    , type   = require('../lib/type')
    , seq    = require('../lib/seq')

describe('seq', function() {
  describe('when given a falsy value', function() {
    it('should return null', function() {
      [0, null, undefined, false, ""].forEach(function(falsy) {
        expect(seq(falsy)).to.equal(null)
      })
    })
  })

  const tests =
        [ [ [1, 2, 3, 4, 5]
          , [1, 2, 3, 4, 5] 
          ]
        , [   { foo: 1,     bar: true,     baz: 'wibble' }
          , [ { foo: 1 }, { bar: true }, { baz: 'wibble' } ]
          ]
        , [  'H'+'e'+'l'+'l'+'o'
          , ['H','e','l','l','o']
          ]
        ]

  tests.forEach(function(t) {
    describe('when given the ' + type(t[0]) + ': ' + t[0], function() {
      const s = seq(t[0])

      it('should return a sequence', function() {
        expect(s).to.eql(t[1])
      })
    })
  })
})