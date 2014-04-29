const expect = require("chai").expect
    , desc   = require("../lib/describe")
    , each   = require("../lib/each")
    , $      = require("../lib/partial")

describe("`describe`", function() {
  describe("when given a non-object", function() {
    it("should throw a TypeError", function() {
      each(
        [ -1, 0, 3.14
        , null, undefined
        , true, false
        , "", "wibble"
        ]
        , function(x) {
          expect($(desc, x)).to.throw("TypeError")
        }
      )
    })
  })

  describe("when given an array", function() {
    it("should return a description of all of its properties", function() {
      const arrdesc = desc([0, 1, 2])

      expect(arrdesc).to.eql(
        { "0": { value: 0, writable: true, enumerable: true, configurable: true }
        , "1": { value: 1, writable: true, enumerable: true, configurable: true }
        , "2": { value: 2, writable: true, enumerable: true, configurable: true }
        , length:
          { value: 3
          , writable: true
          , enumerable: false
          , configurable: false 
          }
        }
      )
    })

    describe("and when also given a property name", function() {
      it("should return a description of just that property", function() {
        const arrdesc = desc([0, 1, 2], 1)

        expect(arrdesc).to.eql(
          { "1":
            { value: 1
            , writable: true
            , enumerable: true
            , configurable: true
            }
          }
        )
      })
    })

    describe("and when given multiple property names", function() {
      it("should return a description of each given name", function() {
        const arrdesc = desc([0, 1, 2], 0, 2)


        expect(arrdesc).to.eql(
          { "0":
            { value: 0
            , writable: true
            , enumerable: true
            , configurable: true
            }
          , "2":
            { value: 2
            , writable: true
            , enumerable: true
            , configurable: true
            }
          }
        )
      })
    })
  })

  describe("when given a map", function() {
    it("should return a description of all of its properties", function() {
      const mapdesc = desc({ foo: "bar", wibble: "wobble" })

      expect(mapdesc).to.eql(
        { foo:
          { value: "bar"
          , writable: true
          , enumerable: true
          , configurable: true
          }
        , wibble:
          { value: "wobble"
          , writable: true
          , enumerable: true
          , configurable: true
          }
        }
      )
    })

    describe("and when also given a property name", function() {
      it("should return a description of just that property", function() {
        const mapdesc = desc({ foo: "bar", wibble: "wobble" }, "foo")

        expect(mapdesc).to.eql(
          { "foo":
            { value: "bar"
            , writable: true
            , enumerable: true
            , configurable: true
            }
          }
        )
      })
    })

    describe("and when given multiple property names", function() {
      it("should return a description of each given name", function() {
        const arrdesc = desc({ foo: "bar", baz: "nope", wibble: "wobble" }, "foo", "wibble")


        expect(arrdesc).to.eql(
          { "foo":
            { value: "bar"
            , writable: true
            , enumerable: true
            , configurable: true
            }
          , "wibble":
            { value: "wobble"
            , writable: true
            , enumerable: true
            , configurable: true
            }
          }
        )
      })
    })
  })
})