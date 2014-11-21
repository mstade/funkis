var expect = require('must')
  , lt     = require('../lib/lt')

describe('lt', function() {
  var tests =
      [ [ [1], true           ]
      , [ [1, 2], true        ]
      , [ [2, 1], false       ]
      , [ [1, 2, 3], true     ]
      , [ [1, 2, 4, 3], false ]
      ]

  tests.forEach(function(test) {
    var args = test[0]
      , res  = test[1]
    
    describe('given ' + args, function() {
      it('should return ' + res, function() {
        expect(lt.apply(null, args)).to.equal(res)
      })
    })
  })
})