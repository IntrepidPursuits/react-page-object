### `.content() => String`
Returns the current URL path

#### Returns

A string of the current URL path

### Example in Jest

```js
import React from 'react'
import Page from 'react-page-object'
import { BrowserRouter, Link } from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <div>
      <Link to="/first" />
    </div>
  </BrowserRouter>
)

describe('currentPath', () => {
  let page

  beforeEach(() => {
    page = new Page(<App />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('returns the current URL path', () => {
    expect(page.currentPath()).toEqual('/')
    page.clickLink('/first')
    expect(page.currentPath()).toEqual('/first')
  })
})
```
