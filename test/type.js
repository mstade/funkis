var expect = require('must')
  , range  = require('../lib/range')
  , type   = require('../lib/type')
  , seq    = require('../lib/seq')
  , src    = require('../lib/src')

describe('type', function() {
  [ ['string', 'hello']
  , ['object', { foo: 'bar', toString: function() { return JSON.stringify(this) } }]
  , ['array', [1, 2, 3]]
  , ['function', function() {}]
  , ['number', Math.PI]
  , ['boolean', true]
  , ['null', null]
  , ['undefined', void 0]
  , ['seq', seq([1, 2, 3])]
  , ['nan', NaN]
  , ['Foo', new (function Foo() {})]
  ].forEach(function(test) {
    describe('when called with ' + src(test[1]), function() {
      it('should return \'' + test[0] + '\'', function() {
        expect(type(test[1])).to.equal(test[0])
      })
    })
  })
})