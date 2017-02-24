### `.findWrapperForChoose(propValue[, options]) => ReactWrapper`

Find a radio button

**Default Checked Props:** `id` and `name`

#### Arguments

1. `propValue` (`String`): Value is compared with the values of the checked props to assert a match.
2. `options` (`Object`): Optional.
  * `propToCheck` (`String`): Name of prop to check against instead of the default checked props.

#### Returns

[`ReactWrapper`][react-wrapper] for an `input` React element whose:
  1. `id` or `name` prop value equals `propValue`
  2. `type` prop value equals `'radio'`

If `options.propToCheck` is specified, then the method returns a
[`ReactWrapper`][react-wrapper] for an `input` React element whose:
  1. value for the prop specified by `options.propToCheck` equals `propValue`
  2. `type` prop value equals `'radio'`

#### Related Methods

- [`.choose(propValue[, options]) => ReactWrapper`](choose.md)

[react-wrapper]: https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md#reactwrapper-api

#### Example in Jest

```js
import React from 'react'
import Page from 'react-page-object'

const App = () => (
  <div>
    <input
      id="input-id"
      type="radio"
    />
    <input
      name="input-name"
      type="radio"
    />
    <input
      className="input-class"
      type="radio"
    />
  </div>
)

describe('findWrapperForChoose', () => {
  let page, wrapper

  beforeEach(() => {
    page = new Page(<App />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('finds wrapper - targeting id', () => {
    wrapper = page.findWrapperForChoose('input-id')
    expect(wrapper.exists()).toBe(true)
  })

  it('finds wrapper - targeting name', () => {
    wrapper = page.findWrapperForChoose('input-name')
    expect(wrapper.exists()).toBe(true)
  })

  it('finds wrapper - targeting non-default prop', () => {
    wrapper = page.findWrapperForChoose('input-class')
    expect(wrapper.exists()).toBe(false)

    wrapper = page.findWrapperForChoose('input-class', { propToCheck: 'className' })
    expect(wrapper.exists()).toBe(true)
  })
})
```
