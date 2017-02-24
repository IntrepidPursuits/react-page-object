### `.contentMatches(matcher) => Boolean`
Returns whether or not the page text matches the given matcher

#### Arguments
1. `matcher` (`RegExp` or `String`): If given a `RegExp`, this is used to match
   against the page content. If given a `String`, [a `RegExp` is created using the `String` as a `pattern`][reg-exp-constructor].
   This created `RegExp` is used to match against the page content. It is
   important to note that this created `RegExp` is case sensitive.

#### Returns
`true` or `false` depending on whether the `RegExp` matcher matches against the
return value of [`.content() => String`][content-method].

#### Related Methods

- [`.content() => String`][content-method]

[content-method]: content.md
[reg-exp-constructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp

### Example in Jest

```js
import React from 'react'
import Page from 'react-page-object'

const App = () => <h1>My App</h1>

describe('contentMatches', () => {
  let page

  beforeEach(() => {
    page = new Page(<App />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('returns true if content matches - RegExp given', () => {
    expect(page.contentMatches(/My App/)).toBe(true)
  })

  it('returns true if content matches - string given', () => {
    expect(page.contentMatches('My App')).toBe(true)
  })

  it('returns false if content does not match', () => {
    expect(page.contentMatches(/should not match/)).toBe(false)
  })
})
```
