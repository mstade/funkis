const expect = require('chai').expect
    , global = (function() { return this }())
    , thunk  = require('../lib/thunk')
    , each   = require('../lib/each')
    , src    = require('../lib/src')

describe('thunk', function() {
  describe('when given a function `fn`', function() {
    describe('and no parameters', function() {
      it('should return a zero arity thunk', function() {
        const th = thunk(function() {})

        expect(th).to.be.a('function')
        expect(th.length).to.equal(0)
        expect(th.name).to.equal('thunk')
      })

      describe('when called', function() {
        it('should call `fn` with no parameters', function(done) {
          const th = thunk(function() {
            expect(arguments.length).to.equal(0)
            done()
          })

          th()
        })

        it('should ignore any parameters given to it', function (done) {
          const th = thunk(function() {
            expect(arguments.length).to.equal(0)
            done()
          })

          th(1, 2, 3)
        })

        it('should return whatever `fn` returns', function() {
          const th = thunk(function() { return 'hello' })
          expect(th()).to.equal('hello')
        })
      })
    })

    each([0, 1, null, {}, [], function(){}, '', 'hello', false, true]
      , function(param) {
        describe('and a single parameter `' + src(param) + '`', function() {
          it('should return a zero arity thunk', function() {
            const th = thunk(function() {})

            expect(th).to.be.a('function')
            expect(th.length).to.equal(0)
          })

          describe('when called', function() {
            it('should call `fn` with `' + src(param) + '` as the sole parameter', function(done) {
              const th = thunk(function(a) {
                expect(arguments.length).to.equal(1)
                expect(a).to.equal(param)
                done()
              }, param)

              th()
            })

            it('should ignore any parameters given to it', function (done) {
              const th = thunk(function(a) {
                expect(arguments.length).to.equal(1)
                expect(a).to.equal(param)
                done()
              }, param)

              th(1, 2, 3, 4)
            })

            it('should return whatever `fn` returns', function() {
              const th = thunk(function(a) { return a }, 'hello')
              expect(th()).to.equal('hello')
            })
          })
        })
      }
    )

    describe('and more than one parameter', function() {
      it('should return a zero arity function', function() {
        const th = thunk(function() {}, 1, 2, 3)
        expect(th).to.be.a('function')
        expect(th.length).to.equal(0)
        expect(th.name).to.equal('thunk')
      })

      describe('and when called', function() {
        it('should call the given function, with the given parameters', function(done) {
          const th = thunk(function(a, b, c) {
            expect(arguments.length).to.equal(3)
            expect(a).to.equal(1)
            expect(b).to.equal(false)
            expect(c).to.equal('c')
            done()
          }, 1, false, 'c')

          th()
        })

        it('should ignore any parameters given to it', function (done) {
          const th = thunk(function(a, b, c) {
            expect(arguments.length).to.equal(3)
            expect(a).to.equal(1)
            expect(b).to.equal(false)
            expect(c).to.equal('c')
            done()
          }, 1, false, 'c')

          th(1, 2, 3, 4)
        })

        it('should return whatever `fn` returns', function() {
          const th = thunk(function(a, b) { return a + ' ' + b }, 'hello', 'world')
          expect(th()).to.equal('hello world')
        })
      })
    })
  })


  describe('when given an unbound function `fn`', function() {
    describe('and when called', function() {
      it('should bind `this` of `fn` to the global object', function(done) {
        const noargs = thunk(function() {
          expect(this).to.equal(global)
          args()
        })

        const args = thunk(function(a, b, c) {
          expect(this).to.equal(global)
          expect(a).to.equal(1)
          expect(b).to.equal(2)
          expect(c).to.equal(3)
          done()
        }, 1, 2, 3)

        noargs()
      })
    })
  })

  describe('when given a bound function `fn`', function() {
    describe('and when called', function() {
      it('should not affect the `this` of `fn`', function(done) {
        const that = {}

        const noargs = thunk(function() {
          expect(this).to.equal(that)
          args()
        }.bind(that))

        const args = thunk(function(a, b, c) {
          expect(this).to.equal(that)
          expect(a).to.equal(1)
          expect(b).to.equal(2)
          expect(c).to.equal(3)
          done()
        }.bind(that), 1, 2, 3)

        noargs()
      })
    })
  })

  describe('when bound', function() {
    describe('and given an unbound function `fn`', function() {
      describe('and when called', function() {
        it('should bind `this` of `fn` to the thunk\'s `this`', function(done) {
          const that = {}

          const noargs = thunk(function() {
            expect(this).to.equal(that)
            args()
          }).bind(that)

          const args = thunk(function(a, b, c) {
            expect(this).to.equal(that)
            expect(a).to.equal(1)
            expect(b).to.equal(2)
            expect(c).to.equal(3)
            done()
          }, 1, 2, 3).bind(that)

          noargs()
        })
      })
    })

    describe('and given a bound function `fn`', function() {
      it('should not affect the `this` of `fn`', function(done) {        
        const that = {}

        const noargs = thunk(function() {
          expect(this).to.not.equal(that)
          args()
        }.bind({})).bind(that)

        const args = thunk(function(a, b, c) {
          expect(this).to.not.equal(that)
          expect(a).to.equal(1)
          expect(b).to.equal(2)
          expect(c).to.equal(3)
          done()
        }.bind({}), 1, 2, 3).bind(that)

        noargs()
      })
    })
  })

  describe('when given a non-function `val` as the first parameter', function() {
    it('should throw a TypeError', function() {
      each(
        [ 0, 1
        , true, false
        , '', 'hello'
        , [], {}
        , null, undefined
        ]
        , function(val) {
          expect(thunk(thunk, val)).to.throw(TypeError)
        }
      )
    })
  })
})