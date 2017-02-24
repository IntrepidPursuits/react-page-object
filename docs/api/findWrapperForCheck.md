### `.findWrapperForCheck(propValue[, options]) => ReactWrapper`

Find a checkbox

**Default Checked Props:** `id` and `name`

#### Arguments

1. `propValue` (`String`): Value is compared with the values of the checked props to assert a match.
2. `options` (`Object`): Optional.
  * `propToCheck` (`String`): Name of prop to check against instead of the default checked props.

#### Returns

[`ReactWrapper`][react-wrapper] for an `input` React element whose:
  1. `id` or `name` prop value equals `propValue`
  2. `type` prop value equals `'checkbox'`

If `options.propToCheck` is specified, then the method returns a
[`ReactWrapper`][react-wrapper] for an `input` React element whose:
  1. value for the prop specified by `options.propToCheck` equals `propValue`
  2. `type` prop value equals `'checkbox'`

#### Related Methods

- [`.check(propValue[, options]) => ReactWrapper`](check.md)
- [`.uncheck(propValue[, options]) => ReactWrapper`](uncheck.md)

[react-wrapper]: https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md#reactwrapper-api

#### Example in Jest

```js
import React from 'react'
import Page from 'react-page-object'

const App = () => (
  <div>
    <input
      id="input-id"
      type="checkbox"
    />
    <input
      name="input-name"
      type="checkbox"
    />
    <input
      className="input-class"
      type="checkbox"
    />
  </div>
)

describe('findWrapperForCheck', () => {
  let page, wrapper

  beforeEach(() => {
    page = new Page(<App />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('finds wrapper - targeting id', () => {
    wrapper = page.findWrapperForCheck('input-id')
    expect(wrapper.exists()).toBe(true)
  })

  it('finds wrapper - targeting name', () => {
    wrapper = page.findWrapperForCheck('input-name')
    expect(wrapper.exists()).toBe(true)
  })

  it('finds wrapper - targeting non-default prop', () => {
    wrapper = page.findWrapperForCheck('input-class')
    expect(wrapper.exists()).toBe(false)

    wrapper = page.findWrapperForCheck('input-class', { propToCheck: 'className' })
    expect(wrapper.exists()).toBe(true)
  })
})
```
