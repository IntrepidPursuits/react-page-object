### `.clickButton(propValue[, options]) => Page`

Click a button

**Default Checked Props:** `id` and `children`

#### Arguments
The `propValue` and `options` arguments are passed to
[`.findWrapperForClickButton`][find-wrapper-method] to find a
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
[`.findWrapperForClickButton`][find-wrapper-method], then the following events will
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

- [`.findWrapperForClickButton(propValue[, options]) => ReactWrapper`][find-wrapper-method]

[react-wrapper]: https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md#reactwrapper-api
[find-wrapper-method]: findWrapperForClickButton.md

#### Example in Jest

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
        <button id="button-id" onClick={this.onClick} />
        <button onClick={this.onClick}>button text</button>
        <button className="button-class" onClick={this.onClick} />
      </div>
    )
  }
}

describe('clickButton', () => {
  let page

  beforeEach(() => {
    page = new Page(<App />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('clicks the button - targeting id', () => {
    expect(page.content()).toMatch(/was not clicked/)
    page.clickButton('button-id')
    expect(page.content()).toMatch(/was clicked/)
  })

  it('clicks the button - targeting children', () => {
    expect(page.content()).toMatch(/was not clicked/)
    page.clickButton('button text')
    expect(page.content()).toMatch(/was clicked/)
  })

  it('clicks the button - targeting non-default prop', () => {
    expect(page.content()).toMatch(/was not clicked/)
    page.clickButton('button-class', { propToCheck: 'className' })
    expect(page.content()).toMatch(/was clicked/)
  })
})
```
