### `.content() => String`
Returns the page text

#### Returns

A string containing all the text in the page. Please note that this does not
include text inside input fields since these are actually HTML attributes.

#### Related Methods

- [`.contentMatches(matcher) => Boolean`][content-matches-method]

[content-matches-method]: contentMatches.md

#### Example in Jest

```js
import React from 'react'
import Page from 'react-page-object'

const App = () => (
  <div>
    <h1>My App</h1>
    <input value="this does not show up" readOnly />
  </div>
)

describe('content', () => {
  let page

  beforeEach(() => {
    page = new Page(<App />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('returns page text', () => {
    expect(page.content()).toMatch(/My App/)
    expect(page.content()).not.toMatch(/this does not show up/)
  })

  it('does not contain text inside input fields', () => {
    expect(page.content()).not.toMatch(/this does not show up/)
  })
})
```
