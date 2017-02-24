### `.findWrapperForClickButton(propValue[, options]) => ReactWrapper`

Find a button

**Default Checked Props:** `id` and `children`

#### Arguments

1. `propValue` (`String`): Value is compared with the values of the checked props to assert a match.
2. `options` (`Object`): Optional.
  * `propToCheck` (`String`): Name of prop to check against instead of the default checked props.

#### Returns

[`ReactWrapper`][react-wrapper] for a `button` React element whose:
  1. `id` or `children` prop value equals `propValue`

If `options.propToCheck` is specified, then the method returns a
[`ReactWrapper`][react-wrapper] for a `button` React element whose:
  1. value for the prop specified by `options.propToCheck` equals `propValue`

#### Related Methods

- [`.clickButton(propValue[, options]) => ReactWrapper`](clickButton.md)

[react-wrapper]: https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md#reactwrapper-api

#### Example in Jest

```js
import React from 'react'
import Page from 'react-page-object'

const App = () => (
  <div>
    <button id="button-id" />
    <button>button text</button>
    <button className="button-class" />
  </div>
)

describe('findWrapperForClickButton', () => {
  let page, wrapper

  beforeEach(() => {
    page = new Page(<App />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('finds wrapper - targeting id', () => {
    wrapper = page.findWrapperForClickButton('button-id')
    expect(wrapper.exists()).toBe(true)
  })

  it('finds wrapper - targeting children', () => {
    wrapper = page.findWrapperForClickButton('button text')
    expect(wrapper.exists()).toBe(true)
  })

  it('finds wrapper - targeting non-default prop', () => {
    wrapper = page.findWrapperForClickButton('button-class')
    expect(wrapper.exists()).toBe(false)

    wrapper = page.findWrapperForClickButton('button-class', { propToCheck: 'className' })
    expect(wrapper.exists()).toBe(true)
  })
})
```
