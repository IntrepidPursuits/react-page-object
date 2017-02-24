### `.clickInput(propValue[, options]) => Page`

Click a clickable input

**Default Checked Props:** `id` and `value`

#### Arguments
The `propValue` and `options` arguments are passed to
[`.findWrapperForClickInput`][find-wrapper-method] to find a
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
[`.findWrapperForClickInput`][find-wrapper-method], then the following events will
be simulated on the [`ReactWrapper`][react-wrapper]'s React element:

1. `blur` event on the React element which is focused. This will occur if there
   is a focused React element and it is not the same as the
   [`ReactWrapper`][react-wrapper]'s React element.
2. `focus` event on the [`ReactWrapper`][react-wrapper]'s React element unless
   it is already in focus.
3. `click` event on the [`ReactWrapper`][react-wrapper]'s React element.
4. `submit` event on the [`ReactWrapper`][react-wrapper]'s React element.

If no [`ReactWrapper`][react-wrapper] is found, then an error is thrown.

#### Related Methods

- [`.findWrapperForClickInput(propValue[, options]) => ReactWrapper`][find-wrapper-method]

[react-wrapper]: https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md#reactwrapper-api
[find-wrapper-method]: findWrapperForClickInput.md

### Example in Jest

```js
import React, { Component } from 'react'
import Page from 'react-page-object'

class App extends Component {
  state = { wasClicked: false }

  onClick = event => this.setState({ wasClicked: true })

  render() {
    return (
      <div>
        {this.state.wasClicked ? 'was clicked' : 'was not clicked'}
        <input id="input-id" type="submit" onClick={this.onClick} />
        <input value="input text" type="submit" onClick={this.onClick} />
        <input className="input-class" type="submit" onClick={this.onClick} />
      </div>
    )
  }
}

describe('clickInput', () => {
  let page

  beforeEach(() => {
    page = new Page(<App />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('clicks the input - targeting id', () => {
    expect(page.content()).toMatch(/was not clicked/)
    page.clickInput('input-id')
    expect(page.content()).toMatch(/was clicked/)
  })

  it('clicks the input - targeting value', () => {
    expect(page.content()).toMatch(/was not clicked/)
    page.clickInput('input text')
    expect(page.content()).toMatch(/was clicked/)
  })

  it('clicks the input - targeting non-default prop', () => {
    expect(page.content()).toMatch(/was not clicked/)
    page.clickInput('input-class', { propToCheck: 'className' })
    expect(page.content()).toMatch(/was clicked/)
  })
})
```
