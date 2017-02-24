### `.blurFocusedElement() => Page`

Blur the focused element.

#### Returns

`Page` object which invoked the method. This allow the method to be chained
with another `Page` object method.

#### Simulated Events

If there is a React element which is focused.

1. Simulates a `blur` event on the focused React element. At this point, there is no
   React element which is currently focused.

If there is no React element which is focused, then nothing occurs.

#### Example in Jest

```js
import React, { Component } from 'react'
import Page from 'react-page-object'

class App extends Component {
  state = { wasBlurred: false }

  onBlur = () => this.setState({ wasBlurred: true })

  render() {
    return (
      <div>
        {this.state.wasBlurred ? 'was blurred' : 'was not blurred'}
        <input id="input-id" onBlur={this.onBlur} />
      </div>
    )
  }
}

describe('blurFocusedElement', () => {
  let page

  beforeEach(() => {
    page = new Page(<App />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('blurs the focused element', () => {
    page.fillIn('input-id', 'hi')
    expect(page.content()).toMatch(/was not blurred/)
    page.blurFocusedElement()
    expect(page.content()).toMatch(/was blurred/)
  })
})
```
