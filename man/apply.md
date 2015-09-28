# apply

When given a single argument `fn`, `apply` will call `fn` with no arguments and return its value.

When given the argument `fn` and an array `args`, then the values in `args` will be passed to `fn` when it is called.

The value of `this` will be bound to whatever the value of `this` is when `apply` is called. Thus, `apply.bind(obj)(fn)` would bind `fn` to `obj`, unless `fn` has already been bound.