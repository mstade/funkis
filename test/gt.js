const expect = require('chai').expect
    , gt     = require('../lib/gt')

describe('gt', function() {
  const tests =
        [ [ [1, 2], false      ]
        , [ [2, 1], true       ]
        , [ [1, 2, 3], false   ]
        , [ [4, 3, 2, 1], true ]
        ]

  tests.forEach(function(test) {
    const args = test[0]
        , res  = test[1]
    
    describe('given ' + args, function() {
      it('should return ' + res, function() {
        expect(gt.apply(null, args)).to.equal(res)
      })
    })
  })
})