const expect = require('chai').expect
    , each   = require('../lib/each')
    , str    = require('../lib/str')

describe('str', function() {
  each(
    [ [[], '[]']
    , [{}, '{}']
    , [[1, 2, 3], '[1,2,3]']
    , [{foo: 1, bar: true}, '{"foo":1,"bar":true}']
    , [function() {}, 'function () {}']
    , [1, '1']
    , [true, 'true']
    , [false, 'false']
    , [undefined, 'undefined']
    , [null, 'null']
    , ['', '']
    , ['hello', 'hello']
    ]
    ,
    function(test) {
      describe('when given `' + test[1] + '`', function() {
        it('should return \'' + test[1] + '\'', function() {
          expect(str(test[0])).to.equal(test[1])
        })
      })
    }
  )
})