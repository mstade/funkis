var expect = require('chai').expect
  , assert = require('../lib/assert')
  , each   = require('../lib/each')
  , src    = require('../lib/src')
  , $      = require('../lib/partial')

describe('assert', function() {
  each(
    [ null
    , false
    , undefined
    ]
    ,
    function(x) {
      describe('when given `' + src(x) + '`', function() {
        it('should throw an error with the message `Assertion failed.`', function() {
          expect($(assert, x)).to.throw('Assertion failed.')
        })

        describe('and also given the message `:o(`', function() {
          it('should throw an error with the message `:o(`', function() {
            expect($(assert, x, ':o(')).to.throw(':o(')
          })
        })

        describe('and also given an instance of Error', function() {
          it('should throw that error', function() {
            var err = new Error('sad face')
            expect($(assert, x, err)).to.throw(err)
          })
        })
      })
    }
  )

  each(
    [ 0
    , ''
    , {}
    , []
    ]
    ,
    function(x) {
      describe('when given `' + src(x) + '`', function() {
        it('should not throw an error and return the value', function() {
          expect($(assert, x)).to.not.throw
          expect(assert(x)).to.equal(x)
        })
      })
    }
  )
})