### `.destroy()`
Destroy a `Page` object

Unmounts the `reactElement` used to create the `Page` from the DOM and navigates to `/`.
It is recommended to invoke this method in an `afterEach` callback to clean up any side effects that were created during the test.

#### Related Methods

- [`.constructor(reactElement[, options]) => Page`][constructor-method]

[constructor-method]: constructor.md
