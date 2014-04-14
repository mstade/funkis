const expect = require('chai').expect
    , range  = require('../lib/range')
    , each   = require('../lib/each')
    , seq    = require('../lib/seq')
    , src    = require('../lib/src')
    , is     = require('../lib/is')

describe('is', function() {
  describe('when given a single argument `x`', function() {
    it('should return `true` whenever `x` has a value', function() {
      each(
        [ true, false
        , -2, -1, 0, 1, 2
        , '', 'wibble'
        , [], [1, 2, 3]
        , {}, { foo: 1 }
        , Function
        ]
        , function(x) {
          expect(is(x)).to.be.true
        }
      )
    })

    it('should return `false` whenever `x` is null or undefined', function() {
      expect(is(null)).to.be.false
      expect(is(undefined)).to.be.false
    })
  })

  describe('when testing for numbers', function() {
    each(
      [ 0
      , 1
      , Math.PI
      , Infinity
      , -Infinity
      , Number.MAX_VALUE
      , Number.MIN_VALUE
      , [1e34, '1e34']
      , [0e-34, '0e-34']
      , [09, '09']
      , [0x8393, '0x8393']
      ]
      ,
      function(x) {
        const n = is(x, Array)? x[1] : src(x)

        is(x, Array) && (x = x[0])

        describe('and when `x = '+n+'`', function() {
          it('should return true', function() {
            expect(is(x, Number)).to.be.true
            expect(is(x, 'number')).to.be.true
          })
        })
      }
    )

    each(
      [ NaN
      , ''
      , {}
      , []
      , false
      , function() {}
      , '342'
      ]
      ,
      function(x) {
        describe('and when `x = '+src(x)+'`', function() {
          it('should return false', function() {
            expect(is(x, Number)).to.be.false
            expect(is(x, 'number')).to.be.false
          })
        })
      }
    )
  })

  describe('when testing for functions', function() {
    each(
      [ function() {}
      , Function
      , Object
      , String
      , Number
      , Array
      ]
      ,
      function(x) {
        describe('and when `x = '+src(x)+'`', function() {
          it('should return true', function() {
            expect(is(x, Function)).to.be.true
            expect(is(x, 'function')).to.be.true
          })
        })
      }
    )

    each(
      [ 0
      , 1
      , 'hello'
      , {}
      , []
      , null
      , undefined
      , true
      , false
      ]
      ,
      function(x) {
        describe('and when `x = '+src(x)+'`', function() {
          it('should return false', function() {
            expect(is(x, Function)).to.be.false
            expect(is(x, 'function')).to.be.false
          })
        })
      }
    )
  })

  describe('when testing for arrays', function() {
    each(
      [ []
      , [1, 2, 3]
      , [ [], [], [] ]
      ]
      ,
      function(x) {
        describe('and when `x = '+src(x)+'`', function() {
          it('should return true', function() {
            expect(is(x, Array)).to.be.true
            expect(is(x, 'array')).to.be.true
          })
        })
      }
    )

    each(
      [ 0
      , 1
      , 'hello'
      , {}
      , null
      , undefined
      , true
      , false
      ]
      ,
      function(x) {
        describe('and when `x = '+src(x)+'`', function() {
          it('should return false', function() {
            expect(is(x, Array)).to.be.false
            expect(is(x, 'array')).to.be.false
          })
        })
      }
    )
  })

  describe('when testing for NaN', function() {
    describe('and when `x = NaN`', function() {
      it('should return true', function() {
        expect(is(NaN, NaN)).to.be.true
        expect(is(NaN, 'nan')).to.be.true
      })
    })

    each(
      [ 0
      , 1
      , 'hello'
      , {}
      , []
      , null
      , undefined
      , true
      , false
      ]
      ,
      function(x) {
        describe('and when `x = '+src(x)+'`', function() {
          it('should return false', function() {
            expect(is(x, NaN)).to.be.false
            expect(is(x, 'nan')).to.be.false
          })
        })
      }
    )
  })

  describe('when testing for objects', function () {
     each(
      [ {}
      , new Object()
      , Object({})
      , [Object(null), 'Object(null)']
      , [Object(undefined), 'Object(undefined)']
      ]
      ,
      function(x) {
        const n = is(x, Array)? x[1] : src(x)

        is(x, Array) && (x = x[0])

        describe('and when `x = '+n+'`', function() {
          it('should return true', function() {
            expect(is(x, Object)).to.be.true
            expect(is(x, 'Object')).to.be.true
          })
        })
      }
    )

    each(
      [ NaN
      , 324234
      , ''
      , []
      , true
      , false
      , function() {}
      , '342'
      , null
      , undefined
      , [Object([]), 'Object([])']
      , [Object(''), 'Object("")']
      , [Object('hello'), 'Object("hello")']
      , [Object(0), 'Object(0)']
      , [Object(1), 'Object(1)']
      ]
      ,
      function(x) {
        const n = is(x, Array)? x[1] : src(x)

        is(x, Array) && (x = x[0])

        describe('and when `x = '+n+'`', function() {
          it('should return false', function() {
            expect(is(x, Object)).to.be.false
            expect(is(x, 'Object')).to.be.false
          })
        })
      }
    )
  })

  describe('when testing for strings', function() {
    each(
      [ ''
      , 'hello'
      , [String({}), 'String({})']
      , [String(null), 'String(null)']
      , [String(undefined), 'String(undefined)']
      , [String([]), 'String([])']
      , [String(''), 'String("")']
      , [String('hello'), 'String("hello")']
      , [String(0), 'String(0)']
      , [String(1), 'String(1)']
      ]
      ,
      function(x) {
        const n = is(x, Array)? x[1] : src(x)

        is(x, Array) && (x = x[0])

        describe('and when `x = '+n+'`', function() {
          it('should return true', function() {
            expect(is(x, String)).to.be.true
            expect(is(x, 'String')).to.be.true
          })
        })
      }
    )

    each(
      [ NaN
      , 324234
      , {}
      , []
      , true
      , false
      , function() {}
      , null
      , undefined
      ]
      ,
      function(x) {
        describe('and when `x = '+src(x)+'`', function() {
          it('should return false', function() {
            expect(is(x, String)).to.be.false
            expect(is(x, 'String')).to.be.false
          })
        })
      }
    )
  })

  describe('when testing for undefined', function() {
    describe('and when `x = undefined`', function() {
      it('should return true', function() {
        expect(is(undefined, undefined)).to.be.true
        expect(is(undefined, 'undefined')).to.be.true
      })
    })

    each(
      [ NaN
      , 0
      , {}
      , []
      , true
      , false
      , function() {}
      , null
      ]
      ,
      function(x) {
        describe('and when `x = '+src(x)+'`', function() {
          it('should return false', function() {
            expect(is(x, undefined)).to.be.false
            expect(is(x, 'undefined')).to.be.false
          })
        })
      }
    )
  })

  describe('when testing for null', function() {
    describe('and when `x = null`', function() {
      it('should return true', function() {
        expect(is(null, null)).to.be.true
        expect(is(null, 'null')).to.be.true
      })
    })

    each(
      [ NaN
      , 0
      , {}
      , []
      , true
      , false
      , function() {}
      , undefined
      ]
      ,
      function(x) {
        describe('and when `x = '+src(x)+'`', function() {
          it('should return false', function() {
            expect(is(x, null)).to.be.false
            expect(is(x, 'null')).to.be.false
          })
        })
      }
    )
  })
})