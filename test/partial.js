const expect = require("chai").expect
    , $      = require("../lib/partial") 

describe("`partial`", function() {
  describe("given a function", function() {
    describe("and no other parameters", function() {
      it("should just return the given function", function() {
        const fun = $(test)
        expect(fun).to.equal(test)
        function test(a, b) {}
      })
    })
  })

  describe("and some parameters", function() {
    it("should return a left-to-right partially applied function", function() {
      expect(test(2, 5)).to.equal(7)
      
      const fun = $(test, 2)

      expect(fun(5)).to.equal(7)

      function test(a, b) {
        expect(a).to.equal(2)
        expect(b).to.equal(5)
        return a + b
      }
    })

    describe("when a parameter is identical to the `partial` function", function() {
      describe("and when the partially applied function is called", function() {
        it("should replace the `partial` parameter with the first argument passed", function() {
          const π = Math.PI

          expect(test(1, "wibble", 3)).to.equal(π)

          const fun = $(test, 1, $, 3)

          expect(fun("wibble")).to.equal(π)

          function test(a, b, c) {
            expect(a).to.equal(1)
            expect(b).to.equal("wibble")
            expect(c).to.equal(3)
            return π
          }
        })
      })
    })

    describe("when there are more than one `partial` parameter", function() {
      describe("and when the partially applied function is called", function() {
        it("should replace the `partial` parameters in a left-to-right fashion", function() {
          expect(test(9, "7", false, null)).to.equal("wibble")

          const fun = $(test, $, "7", $, null)

          expect(fun(9, false)).to.equal("wibble")

          function test(a, b, c, d) {
            expect(a).to.equal(9)
            expect(b).to.equal("7")
            expect(c).to.equal(false)
            expect(d).to.equal(null)
            return "wibble"
          }
        })
      })
    })
  })
})