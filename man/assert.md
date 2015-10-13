# assert

If the first argument `x` passed to `assert` is logically true, the value of `x` is returned. If however, the value of `x` is logically false then `assert` will throw an error. If provided with a second parameter `message`, the thrown error will carry that message. If `message` is an actual `Error` instance, it will be thrown without modification.