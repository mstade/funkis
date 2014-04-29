const expect = require("chai").expect
    , extend = require("../lib/extend")
    , each   = require("../lib/each")
    , $      = require("../lib/partial")

describe("`extend`", function() {
  describe("given a base object", function() {
    describe("when it is not extendable", function() {
      it("should throw a TypeError", function() {
        each(
          [ -1, 0, 1, 3.14
          , true, false
          , null, undefined
          ]
          , function(base) {
            expect($(extend, base, {})).to.throw("TypeError")
          }
        )
      })
    })

    describe("when it is extendable", function() {
      describe("and when given an extension object", function() {
        it("should return a new object derived from the base and with the properties of the extension", function() {
          const A = { foo: 1 }
              , B = { foo: 2, bar: "wibble" }
              , C = extend(A, B)

          expect(A.isPrototypeOf(C)).to.be.true
          expect(C).to.have.property("foo", 2)
          expect(C).to.have.property("bar", "wibble")
        })
      })

      describe("and when given more than one extension object", function() {
        it("should return a new object derived from the base and with the merged properties of all extensions", function() {
          const A = { foo: 1 }
              , B = { foo: 2, bar: "wibble" }
              , C = { baz: "wobble" }
              , D = extend(A, B, C)

          expect(A.isPrototypeOf(D)).to.be.true
          expect(D).to.have.property("foo", 2)
          expect(D).to.have.property("bar", "wibble")
          expect(D).to.have.property("baz", "wobble")
        })

        describe("and when the extension objects have identical property names", function() {
          it("should choose the rightmost property for the merged extension", function() {
            const A = { foo: 1 }
                , B = { foo: 2, bar: "wibble" }
                , C = { foo: "moo", bar: "wobble" }
                , D = extend(A, B, C)

          expect(A.isPrototypeOf(D)).to.be.true
          expect(D).to.have.property("foo", "moo")
          expect(D).to.have.property("bar", "wobble")
          })
        })
      })
    })
  })
})