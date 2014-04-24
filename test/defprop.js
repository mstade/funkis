const defprop = require("../lib/defprop")
    , expect  = require("chai").expect
    , desc    = Object.getOwnPropertyDescriptor
    , each    = require("../lib/each")
    , $       = require("../lib/partial")

describe("`defprop`", function() {
  describe("given a target object", function() {
    describe("which doesn't exist", function() {
      it("should throw a TypeError", function() {
	expect($(defprop, null)).to.throw(TypeError)
      })
    })

    describe("and an empty or logically false set of fields", function() {
      it("should throw a TypeError", function() {
	each([null, undefined, false, {}], function(fields) {
	  expect($(defprop, {}, fields)).to.throw(TypeError)
	})
      })
    })

    describe("and a valid set of fields", function() {
      it("should mutate the target object", function() {
	const target = {}

	expect(target).to.not.have.property('foo')
	defprop(target, { foo: 'wobble' })
	expect(target).to.have.property('foo', 'wobble')
      })

      it("should return the mutated target object", function() {
	const target = {}

	expect(target).to.not.have.property('foo')
	expect(defprop(target, { foo: 'wobble' })).to.equal(target)
	expect(target).to.have.property('foo', 'wobble')
      })

      it("should not make the fields configurable", function() {
	const target = defprop({}, { foo: 'wobble' })
	expect(desc(target, 'foo')).to.have.property('configurable', false)
      })

      describe("when a field is a getter and/or setter, or the field is a function", function() {
	it("should bind the field to a private scope", function() {
	  const target = defprop({},
	    { get prop()      { return this.wibble }
	    , set prop(x)     { this.wibble = x }
	    , get scope()     { return this }
	    , fun: function() { return this }
	    }
	  )

	  const scope = target.scope
	  expect(scope).to.not.equal(target)
	  expect(target.isPrototypeOf(scope))

	  expect(target.prop).to.equal(undefined)
	  expect(scope).to.not.have.property('wibble')
	  expect(target).to.not.have.property('wibble')

	  target.prop = 'wobble'
	  expect(target.prop).to.equal('wobble')
	  expect(scope).to.have.property('wibble', 'wobble')
	  expect(target).to.not.have.property('wibble')

	  expect(target.fun()).to.equal(scope)
	})

	it("should create a new private scope for each subsequent call", function() {
	  const target = {}

	  defprop(target, { get one() { return this }})
	  defprop(target, { get two() { return this }})

	  expect(target.one).to.not.equal(target.two)
	})
      })

      describe("when a field has no options", function() {
	it("should make the field immutable", function() {
	  const target = defprop({}, { foo: 1 })
	  expect(desc(target, 'foo')).to.have.property('writable', false)
	})

	it("should not make the field enumerable", function() {
	  const target = defprop({}, { foo: 1 })
	  expect(desc(target, 'foo')).to.have.property('enumerable', false)
	})
      })

      describe("when a field is set to be writable", function() {
	describe("and is just a getter", function() {
	  it("should throw a TypeError", function() {
	    const field = { get field() {} }
		, opt   = { field: { writable : true } }

	    expect($(defprop, {}, field, opt)).to.throw(TypeError)
	  })
	})

	describe("but when it is any other value", function() {
	  it("should make the field mutable", function() {
	    each(
	      [ { get field() {}, set field() {} }
	      , { set field() {} }
	      , { field: 1 }
	      , { field: 'wibble' }
	      , { field: function() {} }
	      ]
	      , function(field) {
		const target = {}
		defprop(target, field, { field: { writable: true } })

		const prop = desc(target, 'field')

		if (prop.value) {
		  expect(prop).to.have.property('writable', true)
		} else {
		  expect(prop.set).to.be.ok
		}
	      }
	    )
	  })
	})
      })

      describe("when a field is set to be enumerable", function() {
	it("should make the field enumerable", function() {
	  each(
	    [ { get field() {}, set field() {} }
	    , { set field() {} }
	    , { field: 1 }
	    , { field: 'wibble' }
	    , { field: function() {} }
	    ]
	    , function(field) {
	      const target = {}
	      defprop(target, field, { field: { enumerable: true } })
	      expect(target).to.have.key('field')
	    }
	  )
	})
      })
    })
  })
})