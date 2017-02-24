### `.findWrapperForClickInput(propValue[, options]) => ReactWrapper`

Find a clickable input

**Default Checked Props:** `id` and `value`

#### Arguments

1. `propValue` (`String`): Value is compared with the values of the checked props to assert a match.
2. `options` (`Object`): Optional.
  * `propToCheck` (`String`): Name of prop to check against instead of the default checked props.

#### Returns

[`ReactWrapper`][react-wrapper] for an `input` React element whose:
  1. `id` or `value` prop value equals `propValue`
  2. `type` prop value equals `'submit'`

If `options.propToCheck` is specified, then the method returns a
[`ReactWrapper`][react-wrapper] for an `input` React element whose:
  1. value for the prop specified by `options.propToCheck` equals `propValue`
  2. `type` prop value equals `'submit'`

#### Related Methods

- [`.clickInput(propValue[, options]) => ReactWrapper`](clickInput.md)

[react-wrapper]: https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md#reactwrapper-api

#### Example in Jest

```js
import React from 'react'
import Page from 'react-page-object'

const App = () => (
  <div>
    <input id="input-id" type="submit" />
    <input value="input text" type="submit" />
    <input className="input-class" type="submit" />
  </div>
)

describe('findWrapperForClickInput', () => {
  let page, wrapper

  beforeEach(() => {
    page = new Page(<App />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('finds wrapper - targeting id', () => {
    wrapper = page.findWrapperForClickInput('input-id')
    expect(wrapper.exists()).toBe(true)
  })

  it('finds wrapper - targeting value', () => {
    wrapper = page.findWrapperForClickInput('input text')
    expect(wrapper.exists()).toBe(true)
  })

  it('finds wrapper - targeting non-default prop', () => {
    wrapper = page.findWrapperForClickInput('input-class')
    expect(wrapper.exists()).toBe(false)

    wrapper = page.findWrapperForClickInput('input-class', { propToCheck: 'className' })
    expect(wrapper.exists()).toBe(true)
  })
})
```
