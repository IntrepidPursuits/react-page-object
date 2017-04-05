### `.findWrapperForFillIn(propValue[, options]) => ReactWrapper`

Find a text input

**Default Checked Props:** `id`, `name`, and `placeholder`

#### Arguments

1. `propValue` (`String`): Value is compared with the values of the checked props to assert a match.
2. `options` (`Object`): Optional.
  * `propToCheck` (`String`): Name of prop to check against instead of the default checked props.

#### Returns

[`ReactWrapper`][react-wrapper] for an `input` React element whose:
  1. `id`, `name` or `placeholder` prop value equals `propValue`
  2. `type` prop value is `undefined`, `'email'`, `'password'`, `'text'`, or
     `'tel'`

If `options.propToCheck` is specified, then the method returns a
[`ReactWrapper`][react-wrapper] for an `input` React element whose:
  1. value for the prop specified by `options.propToCheck` equals `propValue`
  2. `type` prop value is `undefined`, `'email'`, `'password'`, `'text'`, or
     `'tel'`

#### Related Methods

- [`.fillIn(propValue, eventTargetValue[, options]) => ReactWrapper`](fillIn.md)

[react-wrapper]: https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md#reactwrapper-api

#### Example in Jest

```js
import React from 'react'
import Page from 'react-page-object'

const App = () => (
  <div>
    <input id="input-id" />
    <input name="input-name" />
    <input placeholder="input-placeholder" />
    <input className="input-class" />
  </div>
)

describe('findWrapperForFillIn', () => {
  let page, wrapper

  beforeEach(() => {
    page = new Page(<App />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('finds wrapper - targeting id', () => {
    wrapper = page.findWrapperForFillIn('input-id', 'hello')
    expect(wrapper.exists()).toBe(true)
  })

  it('finds wrapper - targeting name', () => {
    wrapper = page.findWrapperForFillIn('input-name', 'hello')
    expect(wrapper.exists()).toBe(true)
  })

  it('finds wrapper - targeting placeholder', () => {
    wrapper = page.findWrapperForFillIn('input-placeholder', 'hello')
    expect(wrapper.exists()).toBe(true)
  })

  it('finds wrapper - targeting non-default prop', () => {
    wrapper = page.findWrapperForFillIn('input-class')
    expect(wrapper.exists()).toBe(false)

    wrapper = page.findWrapperForFillIn('input-class', { propToCheck: 'className' })
    expect(wrapper.exists()).toBe(true)
  })
})
```
