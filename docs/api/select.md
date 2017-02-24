### `.select(propValue, childrenPropValueForOption[, options]) => Page`

Select an option from a select box

**Default Checked Props:** `id` and `name`

#### Arguments
The `propValue`, `childrenPropValueForOption`, and `options` arguments are
passed to [`.findWrapperForSelect`][find-wrapper-method] to find a
[`ReactWrapper`][react-wrapper]. The [`ReactWrapper`][react-wrapper] will be
used to simulate events.

1. `propValue` (`String`): Value is compared with the values of the checked
   props to assert a match.
2. `childrenPropValueForOption` (`String`): Value is compared with the
   `children` prop value of children `option` React elements for potentially
   matching `select` React element.
3. `options` (`Object`): Optional.
  * `propToCheck` (`String`): Name of prop to check against instead of the default checked props.

#### Returns

`Page` object which invoked the method. This allow the method to be chained
with another `Page` object method.

#### Simulated Events
If a [`ReactWrapper`][react-wrapper] is found by
[`.findWrapperForSelect`][find-wrapper-method], then the following events will
be simulated on the [`ReactWrapper`][react-wrapper]'s React element:

1. `blur` event on the React element which is focused. This will occur if there
   is a focused React element and it is not the same as the
   [`ReactWrapper`][react-wrapper]'s React element.
2. `focus` event on the [`ReactWrapper`][react-wrapper]'s React element unless
   it is already in focus.
3. `change` event on the [`ReactWrapper`][react-wrapper]'s React element. The
   matching `option` React element will be the one whose `children` prop value
   equals `childrePropValueForOption`. For `onChange` event handlers triggered
   by this simulated `change` event, `event.target.value` will equal the value
   of the `value` prop for the matching option.

If no [`ReactWrapper`][react-wrapper] is found, then an error is thrown.

#### Related Methods

- [`.findWrapperForSelect(propValue, childrenPropValueForOption[, options]) => ReactWrapper`][find-wrapper-method]

[react-wrapper]: https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md#reactwrapper-api
[find-wrapper-method]: findWrapperForSelect.md

#### Example in Jest

```js
import React, { Component } from 'react'
import Page from 'react-page-object'

class App extends Component {
  state = { selectedOption: 'value 1' }

  onChange = event => this.setState({ selectedOption: event.target.value })

  render() {
    return (
      <div>
        {this.state.selectedOption}
        <select id="select-id" onChange={this.onChange}>
          <option value="value 1">option 1</option>
          <option value="value 2">option 2</option>
        </select>
        <select name="select-name" onChange={this.onChange}>
          <option value="value 1">option 1</option>
          <option value="value 2">option 2</option>
        </select>
        <select className="select-class" onChange={this.onChange}>
          <option value="value 1">option 1</option>
          <option value="value 2">option 2</option>
        </select>
      </div>
    )
  }
}

describe('select', () => {
  let page, wrapper

  beforeEach(() => {
    page = new Page(<App />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('selects the option - targeting id', () => {
    page.select('select-id', 'option 2')
    expect(page.content()).toMatch(/value 2/)
  })

  it('selects the option - targeting name', () => {
    page.select('select-name', 'option 2')
    expect(page.content()).toMatch(/value 2/)
  })

  it('selects the option - targeting non-default prop', () => {
    page.select('select-class', 'option 2', { propToCheck: 'className' })
    expect(page.content()).toMatch(/value 2/)
  })
})
```
