module.exports = require('../variadic')(go)

function go(process, rest) {
  if (isnt(Generator, process)) throw new TypeError('Co-routine must be a generator function')

  var routine = process.apply(undefined, rest)
    , error   = routine.throw.bind(routine)
    , next    = routine.next.bind(routine)

  tick(function() {
    step(next())
  })

  function step(state) {
    if (is(Promise, state.value) || is(Function, state.value.then)) {
      console.log('step:promise', state)
      Promise.resolve(state.value).then(next).then(step).catch(error)
    } else if (state.done) {
      return /* Put state.value on return channel */
    } else {
      console.log('step:value', state)
      tick(function() {
        step(next(state.value))
      })
    }
  }
}

var tick = setImmediate
  , comp = require('../compose')
  , isnt = require('../isnt')
  , is   = require('../is')

var Generator = (function *(){}).constructor