const expect = require('chai').expect
    , range  = require('../lib/range')
    , each   = require('../lib/each')
    , type   = require('../lib/type')
    , seq    = require('../lib/seq')
    , vec    = require('../lib/vec')
    , src    = require('../lib/src')

describe('vec', function() {
  each(
    [ [ [1, 2, 3, 4, 5]
      , [1, 2, 3, 4, 5] 
      ]
    , [  { foo : 1,     bar : true,     baz : 'wibble' }
      , [['foo', 1 ], ['bar', true ], ['baz', 'wibble' ]]
      ]
    , [  'H'+'e'+'l'+'l'+'o'
      , ['H','e','l','l','o']
      ]
    , [ range(5)
      , [0, 1, 2, 3, 4]
      ]
    , [ seq([undefined, null, false])
      , [undefined, null, false]
      ]
    ], function(t) {
      describe('when given the ' + type(t[0]) + ' `' + src(t[0]) + '`', function() {
        it('should turn it into `' + src(t[1]) + '`', function() {
          const v = vec(t[0])
          expect(v).to.eql(t[1])
        })
      })
    }
  )
})