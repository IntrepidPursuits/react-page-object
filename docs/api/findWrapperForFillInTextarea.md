### `.findWrapperForFillInTextarea(propValue[, options]) => ReactWrapper`

Find a textarea

**Default Checked Props:** `id`, `name`, and `placeholder`

#### Arguments

1. `propValue` (`String`): Value is compared with the values of the checked props to assert a match.
2. `options` (`Object`): Optional.
  * `propToCheck` (`String`): Name of prop to check against instead of the default checked props.

#### Returns

[`ReactWrapper`][react-wrapper] for a `textarea` React element whose:
  1. `id`, `name` or `placeholder` prop value equals `propValue`

If `options.propToCheck` is specified, then the method returns a
[`ReactWrapper`][react-wrapper] for a `textarea` React element whose:
  1. value for the prop specified by `options.propToCheck` equals `propValue`

#### Related Methods

- [`.fillInTextarea(propValue, eventTargetValue[, options]) => ReactWrapper`](fillInTextarea.md)

[react-wrapper]: https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md#reactwrapper-api

#### Example in Jest

```js
import React from 'react'
import Page from 'react-page-object'

const App = () => (
  <div>
    <textarea id="textarea-id" />
    <textarea name="textarea-name" />
    <textarea placeholder="textarea-placeholder" />
    <textarea className="textarea-class" />
  </div>
)

describe('findWrapperForFillInTextarea', () => {
  let page, wrapper

  beforeEach(() => {
    page = new Page(<App />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('finds wrapper - targeting id', () => {
    wrapper = page.findWrapperForFillInTextarea('textarea-id', 'hello')
    expect(wrapper.exists()).toBe(true)
  })

  it('finds wrapper - targeting name', () => {
    wrapper = page.findWrapperForFillInTextarea('textarea-name', 'hello')
    expect(wrapper.exists()).toBe(true)
  })

  it('finds wrapper - targeting placeholder', () => {
    wrapper = page.findWrapperForFillInTextarea('textarea-placeholder', 'hello')
    expect(wrapper.exists()).toBe(true)
  })

  it('finds wrapper - targeting non-default prop', () => {
    wrapper = page.findWrapperForFillInTextarea('textarea-class')
    expect(wrapper.exists()).toBe(false)

    wrapper = page.findWrapperForFillInTextarea('textarea-class', { propToCheck: 'className' })
    expect(wrapper.exists()).toBe(true)
  })
})
```
