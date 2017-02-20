### `.constructor(reactElement[, options]) => Page`
Create a `Page` object

It is recommended to invoke this method in a `beforeEach` callback to generate a new `Page` object for every test.

#### Arguments
1. `reactElement` (`String`): React element which should be mounted onto the DOM.
2. `options` (`Object`): Optional.
  * `initialPath` (`String`): The initial path where the page object is mounted. Defaults to `/`.

#### Returns

`Page` object

#### Related Methods

- [`.destroy()`][destroy-method]

[destroy-method]: destroy.md
