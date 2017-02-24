### `.findWrapperForClickLink(propValue[, options]) => ReactWrapper`

Find a link

**Default Checked Props:** `id`, `children`, and `href`

#### Arguments

1. `propValue` (`String`): Value is compared with the values of the checked props to assert a match.
2. `options` (`Object`): Optional.
  * `propToCheck` (`String`): Name of prop to check against instead of the default checked props.

#### Returns

[`ReactWrapper`][react-wrapper] for an `a` React element whose:
  1. `id`, `children`, or `href` prop value equals `propValue`

If `options.propToCheck` is specified, then the method returns a
[`ReactWrapper`][react-wrapper] for an `a` React element whose:
  1. value for the prop specified by `options.propToCheck` equals `propValue`

#### Related Methods

- [`.clickLink(propValue[, options]) => ReactWrapper`](clickLink.md)

[react-wrapper]: https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md#reactwrapper-api

#### Example in Jest

```js
import React from 'react'
import Page from 'react-page-object'
import { BrowserRouter, Link } from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <div>
      <Link id="link-id" to="/first" />
      <Link to="/second">link text</Link>
      <Link to="/link-href" />
      <Link className="link-class" to="/fourth" />
    </div>
  </BrowserRouter>
)

describe('findWrapperForClickLink', () => {
  let page, wrapper

  beforeEach(() => {
    page = new Page(<App />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('finds wrapper - targeting id', () => {
    wrapper = page.findWrapperForClickLink('link-id')
    expect(wrapper.exists()).toBe(true)
  })

  it('finds wrapper - targeting children', () => {
    wrapper = page.findWrapperForClickLink('link text')
    expect(wrapper.exists()).toBe(true)
  })

  it('finds wrapper - targeting href', () => {
    wrapper = page.findWrapperForClickLink('/link-href')
    expect(wrapper.exists()).toBe(true)
  })

  it('finds wrapper - targeting non-default prop', () => {
    wrapper = page.findWrapperForClickLink('link-class')
    expect(wrapper.exists()).toBe(false)

    wrapper = page.findWrapperForClickLink('link-class', { propToCheck: 'className' })
    expect(wrapper.exists()).toBe(true)
  })
})
```
