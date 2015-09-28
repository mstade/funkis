var expect = require('must')
  , slice  = require('../lib/slice')
  , each   = require('../lib/each')

describe('slice', function() {
  describe('given a falsy value', function() {
    it('should return null', function() {
      each([null, undefined, 0, false, ''], function(test) {
        expect(slice(test)).to.equal(null)
      })
    })
  })

  describe('given the array [1,2,3,4,5]', function() {
    var arr = [1, 2, 3, 4, 5]

    describe('and no other arguments', function() {
      it('should return an exact copy', function() {
        var copy = slice(arr)

        expect(copy).to.not.equal(arr)
        expect(copy).to.eql([1, 2, 3, 4, 5])
      })
    })

    describe('and a start index of 1', function() {
      it('should return [2,3,4,5]', function() {
        expect(slice(arr, 1)).to.eql([2, 3, 4, 5])
      })
    })

    describe('and a start index of -1', function() {
      it('should return [5]', function() {
        expect(slice(arr, -1)).to.eql([5])
      })
    })

    describe('and the range 0:1', function() {
      it('should return [1]', function() {
        expect(slice(arr, 0, 1)).to.eql([1])
      })
    })

    describe('and the range 0:-1', function() {
      it('should return [1, 2, 3, 4]', function() {
        expect(slice(arr, 0, -1)).to.eql([1, 2, 3, 4])
      })
    })

    describe('and the range 1:1', function() {
      it('should return an empty array', function() {
        expect(slice(arr, 1, 1)).to.be.empty
      })
    })
  })
})