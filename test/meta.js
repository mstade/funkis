const expect = require("chai").expect
    , each   = require("../lib/each")
    , meta   = require("../lib/meta")
    , $      = require("../lib/partial")

describe("`meta`", function() {
  describe("given an object `x`", function() {
    describe("when `x` is logically false", function() {
      it("should return `null`", function() {
        each([null, false, undefined], function(x) {
          expect(meta(x)).to.be.null
        })
      })
    })

    describe("when called with no other parameters", function() {
      describe("and when `x` is associated with metadata", function() {
        it("should return the metadata object", function() {
          const m = { foo: "wibble" }
              , x = {}

          meta(x, m)
          expect(meta(x)).to.eql(m)
        })
      })

      describe("but when `x` is not associated with metadata", function() {
        it("should return null", function() {
          expect(meta({})).to.be.null
        })
      })
    })

    describe("and also given a map `data`", function() {
      describe("when `x` is not extensible", function() {
        it("should throw an error", function() {
          each(
            [ Object.preventExtensions({})
            , Object.freeze({})
            , Object.seal({})
            ]
            , function(x) {
              expect($(meta, x, {})).to.throw()
            }
          )
        })
      })

      describe("when `x` is not associated with any metadata", function() {
        it("should set all values of `data` and return the full metadata object", function() {
          const m = { foo: "wibble" }
              , x = {}

          expect(meta(x, m)).to.eql(m)
          expect(meta(x)).to.eql(m)
        })
      })

      describe("when `x` is associated with metadata", function() {
        describe("and when no properties of `data` overlap", function() {
          it("should set all values of `data` and return the full metadata object", function() {
            const a = { foo: "wibble" }
                , b = { bob: "wobble" }
                , c = { foo: "wibble", bob: "wobble" }
                , x = {}

            expect(meta(x, a)).to.eql(a)
            expect(meta(x, b)).to.eql(c)
          })
        })

        describe("but when any one property of `data` overlap", function() {
          it("should throw an error", function() {
            const a = { foo: "wibble" }
                , b = { foo: "wobble" }
                , x = {}

            expect(meta(x, a)).to.eql(a)
            expect($(meta, x, b)).to.throw()
          })
        })
      })
    })
  })
})