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

#### Example in Jest

```js
import React from 'react'
import Page from 'react-page-object'

const App = () => <h1>My App</h1>

describe('constructor - no options specified', () => {
  let page

  beforeEach(() => {
    page = new Page(<App />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('creates a page object at the root path', () => {
    expect(page.content()).toMatch(/My App/)
    expect(page.currentPath()).toMatch('/')
  })
})

describe('constructor - initialPath specified', () => {
  let page
  beforeEach(() => {
    page = new Page(<App />, { initialPath: '/examples' })
  })

  afterEach(() => {
    page.destroy()
  })

  it('creates a page object at the specified path', () => {
    expect(page.content()).toMatch(/My App/)
    expect(page.currentPath()).toMatch('/examples')
  })
})
```
