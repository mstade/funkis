const expect = require('chai').expect
    , range  = require('../lib/range')
    , each   = require('../lib/each')
    , seq    = require('../lib/seq')
    , src    = require('../lib/src')
    , is     = require('../lib/is')

describe('is', function() {
  describe('when given a single argument `x`', function() {
    it('should return `true` whenever `x` is logically true', function() {
      each(
        [ true
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

    it('should return `false` whenever `x` is logically false', function() {
      expect(is(null)).to.be.false
      expect(is(false)).to.be.false
      expect(is(undefined)).to.be.false
    })
  })

  describe('when testing for booleans', function() {
    each([ true, false ], function(x) {
        describe('and when `x = '+x+'`', function() {
          it('should return true', function() {
            expect(is(Boolean, x)).to.be.true
            expect(is('boolean', x)).to.be.true
          })
        })
      }
    )

    each(
      [ NaN
      , '', 'wobble', 'true', 'false'
      , {}
      , []
      , -1, 0, 1, 3.14
      , function() {}
      , undefined, null
      ]
      ,
      function(x) {
        describe('and when `x = '+src(x)+'`', function() {
          it('should return false', function() {
            expect(is(Boolean, x)).to.be.false
            expect(is('boolean', x)).to.be.false
          })
        })
      }
    )
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
        const n = is(Array, x)? x[1] : src(x)

        is(Array, x) && (x = x[0])

        describe('and when `x = '+n+'`', function() {
          it('should return true', function() {
            expect(is(Number, x)).to.be.true
            expect(is('number', x)).to.be.true
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
            expect(is(Number, x)).to.be.false
            expect(is('number', x)).to.be.false
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
            expect(is(Function, x)).to.be.true
            expect(is('function', x)).to.be.true
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
            expect(is(Function, x)).to.be.false
            expect(is('function', x)).to.be.false
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
            expect(is(Array, x)).to.be.true
            expect(is('array', x)).to.be.true
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
            expect(is(Array, x)).to.be.false
            expect(is('array', x)).to.be.false
          })
        })
      }
    )
  })

  describe('when testing for NaN', function() {
    describe('and when `x = NaN`', function() {
      it('should return true', function() {
        expect(is(NaN, NaN)).to.be.true
        expect(is('NaN', NaN)).to.be.true
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
            expect(is(NaN, x)).to.be.false
            expect(is('nan', x)).to.be.false
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
        const n = is(Array, x)? x[1] : src(x)

        is(Array, x) && (x = x[0])

        describe('and when `x = '+n+'`', function() {
          it('should return true', function() {
            expect(is(Object, x)).to.be.true
            expect(is('Object', x)).to.be.true
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
        const n = is(Array, x)? x[1] : src(x)

        is(Array, x) && (x = x[0])

        describe('and when `x = '+n+'`', function() {
          it('should return false', function() {
            expect(is(Object, x)).to.be.false
            expect(is('Object', x)).to.be.false
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
        const n = is(Array, x)? x[1] : src(x)

        is(Array, x) && (x = x[0])

        describe('and when `x = '+n+'`', function() {
          it('should return true', function() {
            expect(is(String, x)).to.be.true
            expect(is('String', x)).to.be.true
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
            expect(is(String, x)).to.be.false
            expect(is('String', x)).to.be.false
          })
        })
      }
    )
  })

  describe('when testing for undefined', function() {
    describe('and when `x = undefined`', function() {
      it('should return true', function() {
        expect(is(undefined, undefined)).to.be.true
        expect(is('undefined', undefined)).to.be.true
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
            expect(is(undefined, x)).to.be.false
            expect(is('undefined', x)).to.be.false
          })
        })
      }
    )
  })

  describe('when testing for null', function() {
    each(
      [ null
      , undefined
      ]
      , function(x) {
        describe('and when `x = '+src(x)+'`', function() {
          it('should return true', function() {
            expect(is(null, x)).to.be.true
            expect(is('null', x)).to.be.true
          })
        })
      }
    )

    each(
      [ NaN
      , 0
      , {}
      , []
      , true
      , false
      , function() {}
      ]
      , function(x) {
        describe('and when `x = '+src(x)+'`', function() {
          it('should return false', function() {
            expect(is(null, x)).to.be.false
            expect(is('null', x)).to.be.false
          })
        })
      }
    )
  })
})