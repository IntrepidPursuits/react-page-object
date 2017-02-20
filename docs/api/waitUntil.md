#### `.waitUntil(callback[, options]) => Promise`
Wait until a certain condition is met. Useful for testing asynchronicity

#### Arguments
1. `callback` (`Function`): Invoked to determine if condition has been met.
2. `options` (`Object`): Optional.
  * `delay` (`Number`): Time in milliseconds to wait in between invocations of
    `callback`. Defaults to `10`.
  * `numberOfTries` (`Number`): Maximum number of times to invoke `callback`
    before rejecting the returned `Promise`. Defaults to `50`.

#### Returns

A `Promise` object. The given `callback` is invoked as many times as specified
by `options.numberOfTries` at an interval whose duration is specified by
`options.delay`. If `callback` ever returns a truthy value, then the returned
`Promise` is resolved. If `callback` is invoked more than what is specified by
`options.numberOfTries`, then the returned `Promise` is rejected.
