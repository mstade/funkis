module.exports = require('./variadic')(go)

function go(process, rest) {
  if (isnt(Generator, process)) throw new TypeError('Co-routine must be a generator function')

  var routine = process.apply(undefined, rest)

  tick(function() {
    step(routine.next())
  })

  function step(state) {
    if (isnt(Object, state)) {
      routine.throw(state)
    } else if (state.done) return

    state = routine.next(state.value)

    if (is(Promise, state.value)) {
      state.value.then(step)
    } else {
      setImmediate(step.bind(null, state))
    }
  }
}

var tick = setImmediate
  , comp = require('./compose')
  , isnt = require('./isnt')
  , is   = require('./is')

var Generator = (function *(){}).constructor