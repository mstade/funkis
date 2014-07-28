const expect = require("chai").expect
    , slice  = require("../lib/slice")
    , apply  = require("../lib/apply")
    , each   = require("../lib/each")
    , $      = require("../lib/partial")

describe("`apply`", function() {
  describe("given a non-function", function() {
    it("should throw a TypeError", function() {
      each(
        [ 0
        , 1
        , []
        , {}
        , true
        , false
        , null
        , undefined
        ]
        , function(nonfn) {
          expect($(apply, nonfn)).to.throw(TypeError)
        }
      )
    })
  })

  describe("given a function `fn`", function() {
    describe("and no arguments", function(done) {
      describe("when called", function() {
        it("should not pass any arguments", function(done) {
          apply(fn)

          function fn() {
            expect(arguments.length).to.equal(0)
            done()
          }
        })

        it("should return the correct return value", function() {
          expect(apply(fn)).to.equal("wibble")

          function fn() {
            expect(arguments.length).to.equal(0)
            return "wibble"
          }
        })

        it("should not affect the binding of `fn`", function() {
          const that = { wibble: "wobble" }
          expect(apply(fn.bind(that))).to.equal(that)

          function fn() {
            expect(arguments.length).to.equal(0)
            expect(this).to.equal(that)
            return this
          }
        })
      })
    })

    describe("and some arguments", function(done) {
      describe("when called", function() {
        it("should pass the arguments", function(done) {
          apply(fn, [1, true, "wibble"])

          function fn() {
            expect(slice(arguments)).to.eql([1, true, "wibble"])
            done()
          }
        })

        it("should return the correct return value", function() {
          expect(apply(fn, [1, true, "wibble"])).to.equal("bob")

          function fn() {
            expect(slice(arguments)).to.eql([1, true, "wibble"])
            return "bob"
          }
        })

        it("should not affect the binding of `fn`", function() {
          const that = { wibble: "wobble" }
          expect(apply(fn.bind(that), [1, true, "wibble"])).to.equal("bob")

          function fn() {
            expect(this).to.equal(that)
            expect(slice(arguments)).to.eql([1, true, "wibble"])
            return "bob"
          }
        })
      })
    })
  })
})