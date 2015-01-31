var expect      = require('must')
  , defprotocol = require('../lib/defprotocol')

describe('defprotocol', function() {
  describe('when given an object', function() {
    it('should verify the signature of each key')

    describe('and all signatures are ok', function() {
      var Seq

      it('should return a protocol', function() {
        Seq = defprotocol('Seq',
          { first : []
          , rest  : []
          })

        expect(Seq).to.be.a(Function)
        expect(Seq.name).to.equal('Protocol')
      })

      describe('and when implemented', function() {
        it('should do what it says on the tin', function() {
          var Node = function(data, left, right){
            this.data = data
            this.left = left
            this.right = right
          }

          Seq(Node,
            { first : function() { return this.data }
            , rest  : function() { return [this.left, this.right] }
            })

          var one = new Node(1)
            , two = new Node(2)
            , tre = new Node(3)

          one.left   = tre
          one.right  = two
          two.left   = one
          two.right  = tre
          tre.left   = two
          tre.right  = one

          expect(Seq(one).first()).to.equal(1)
        })
      })
    })
  })
})