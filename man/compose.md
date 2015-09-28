# compose

Returns a composition `fn` of the given functions; that is, a new function which composes all given functions. When called with any number of arguments, `fn` will apply those arguments to the rightmost function given in the composition, whose result will then be applied to the next rightmost function. This process repeats until all functions in the composition have been applied.