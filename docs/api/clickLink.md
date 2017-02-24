### `.clickLink(propValue[, options]) => Page`

Click a link

**Default Checked Props:** `id`, `children`, and `href`

#### Arguments
The `propValue` and `options` arguments are passed to
[`.findWrapperForClickLink`][find-wrapper-method] to find a
[`ReactWrapper`][react-wrapper]. The [`ReactWrapper`][react-wrapper] will be
used to simulate events.

1. `propValue` (`String`): Value is compared with the values of the checked
   props to assert a match.
2. `options` (`Object`): Optional.
  * `propToCheck` (`String`): Name of prop to check against instead of the default checked props.

#### Returns

`Page` object which invoked the method. This allow the method to be chained
with another `Page` object method.

#### Simulated Events
If a [`ReactWrapper`][react-wrapper] is found by
[`.findWrapperForClickLink`][find-wrapper-method], then the following events will
be simulated on the [`ReactWrapper`][react-wrapper]'s React element:

1. `blur` event on the React element which is focused. This will occur if there
   is a focused React element and it is not the same as the
   [`ReactWrapper`][react-wrapper]'s React element.
2. `focus` event on the [`ReactWrapper`][react-wrapper]'s React element unless
   it is already in focus.
3. `click` event on the [`ReactWrapper`][react-wrapper]'s React element.

If no [`ReactWrapper`][react-wrapper] is found, then an error is thrown.

#### Related Methods

- [`.findWrapperForClickLink(propValue[, options]) => ReactWrapper`][find-wrapper-method]

[react-wrapper]: https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md#reactwrapper-api
[find-wrapper-method]: findWrapperForClickLink.md

#### Example in Jest

```js
import React, { Component } from 'react'
import Page from 'react-page-object'
import { BrowserRouter, Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Link id="link-id" to="/first" />
          <Link to="/second">link text</Link>
          <Link to="/link-href" />
          <Link className="link-class" to="/fourth" />
        </div>
      </BrowserRouter>
    )
  }
}

describe('clickLink', () => {
  let page

  beforeEach(() => {
    page = new Page(<App />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('clicks the link - targeting id', () => {
    expect(page.currentPath()).toMatch('/')
    page.clickLink('link-id')
    expect(page.currentPath()).toMatch('/first')
  })

  it('clicks the link - targeting children', () => {
    expect(page.currentPath()).toMatch('/')
    page.clickLink('link text')
    expect(page.currentPath()).toMatch('/second')
  })

  it('clicks the link - targeting href', () => {
    expect(page.currentPath()).toMatch('/')
    page.clickLink('/link-href')
    expect(page.currentPath()).toMatch('/link-href')
  })

  it('clicks the link - targeting non-default prop', () => {
    expect(page.currentPath()).toMatch('/')
    page.clickLink('link-class', { propToCheck: 'className' })
    expect(page.currentPath()).toMatch('/fourth')
  })
})
```
