var expect = require('must')
  , merge  = require('../lib/merge')

describe('merge', function() {
  describe('when given just one object', function() {
    it('should make a shallow copy of that object', function() {
      var foo = { wibble: 1 }
        , bar = merge(foo)

      expect(foo).to.not.equal(bar)
      expect(bar).to.have.own('wibble')
      expect(bar.wibble).to.equal(1)
    })
  })

  describe('when given two objects', function() {
    it('should merge the two objects into a new object', function() {
      var a = { foo: 1 }
        , b = { bar: 2 }
        , m = merge(a, b)

      expect(m).to.not.equal(a)
      expect(m).to.not.equal(b)
      expect(m).to.have.keys(['foo', 'bar'])
      expect(m.foo).to.equal(1)
      expect(m.bar).to.equal(2)
    })

    it('should make sure the left-most object value is used in case of conflict', function() {
      var a = { foo: 1 }
        , b = { foo: 2, bar: 3 }
        , m = merge(a, b)

      expect(m).to.have.keys(['foo', 'bar'])
      expect(m.foo).to.equal(2)
      expect(m.bar).to.equal(3)
    })
  })

  describe('when given more than two objects', function() {
    it('should merge all objects into a new object', function() {
      var a = { foo: 1 }
        , b = { bar: 2 }
        , c = { baz: 3 }
        , m = merge(a, b, c)

      expect(m).to.not.equal(a)
      expect(m).to.not.equal(b)
      expect(m).to.not.equal(c)
      expect(m).to.have.keys(['foo', 'bar', 'baz'])
      expect(m.foo).to.equal(1)
      expect(m.bar).to.equal(2)
      expect(m.baz).to.equal(3)
    })

    it('should make sure the left-most object value is used in case of conflict', function() {
      var a = { foo: 1, bar: 2 }
        , b = { bar: 3, baz: 4 }
        , c = { baz: 5, foo: 6 }
        , m = merge(a, b, c)

      expect(m).to.have.keys(['foo', 'bar', 'baz'])
      expect(m.foo).to.equal(6)
      expect(m.bar).to.equal(3)
      expect(m.baz).to.equal(5)
    })
  })
})