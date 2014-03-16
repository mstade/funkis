const expect = require('chai').expect
    , type   = require('../lib/type')

describe('type', function() {
  [ ['string', 'hello']
  , ['object', { foo: 'bar', toString: function() { return JSON.stringify(this) } }]
  , ['array', [1, 2, 3]]
  , ['function', function() {}]
  , ['number', Math.PI]
  , ['boolean', true]
  , ['null', null]
  , ['undefined', void 0]
  ].forEach(function(test) {
    describe('when called with ' + test[1], function() {
      it('should return \'' + test[0] + '\'', function() {
        expect(type(test[1])).to.equal(test[0])
      })
    })
  })
})