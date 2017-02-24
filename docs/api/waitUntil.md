#### `.waitUntil(callback[, options]) => Promise`
Wait until a certain condition is met. Useful for testing asynchronicity

#### Arguments
1. `callback` (`Function`): Invoked to determine if condition has been met.
2. `options` (`Object`): Optional.
  * `delay` (`Number`): Time in milliseconds to wait in between invocations of
    `callback`. Defaults to `10`.
  * `numberOfTries` (`Number`): Maximum number of times to invoke `callback`
    before rejecting the returned `Promise`. Defaults to `50`.

#### Returns

A `Promise` object. The given `callback` is invoked as many times as specified
by `options.numberOfTries` at an interval whose duration is specified by
`options.delay`. If `callback` ever returns a truthy value, then the returned
`Promise` is resolved. If `callback` is invoked more than what is specified by
`options.numberOfTries`, then the returned `Promise` is rejected.

#### Example in Jest

```js
import React, { Component } from 'react'
import Page from 'react-page-object'

class App extends Component {
  state = {
    shouldShowButton: false,
    shouldShowValue: false,
  }

  componentDidMount() {
    setTimeout(this.showButton, 100)
  }

  showButton = () => this.setState({ shouldShowButton: true })
  showValue = () => this.setState({ shouldShowValue: true })
  onClick = () => setTimeout(this.showValue, 100)

  render() {
    return (
      <div>
        {this.state.shouldShowButton &&
          <button onClick={this.onClick}>click me</button>}
        {this.state.shouldShowValue && 'hello'}
      </div>
    )
  }
}

describe('waitUntil', () => {
  let page, wrapper

  beforeEach(() => {
    page = new Page(<App />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('works with asynchronicity', () => {
    expect(page.findWrapperForClickButton('click me').exists()).toEqual(false)
    return page.waitUntil(() => page.findWrapperForClickButton('click me').exists())
    .then(() => {
      page.clickButton('click me')
      expect(page.content()).not.toMatch(/hello/)
      return page.waitUntil(() => page.contentMatches(/hello/))
    })
    .then(() => {
      expect(page.content()).toMatch(/hello/)
    })
  })

  it('works with asynchronicity - using async function', async () => {
    expect(page.findWrapperForClickButton('click me').exists()).toEqual(false)
    await page.waitUntil(() => page.findWrapperForClickButton('click me').exists())
    page.clickButton('click me')
    expect(page.content()).not.toMatch(/hello/)
    await page.waitUntil(() => page.contentMatches(/hello/))
    expect(page.content()).toMatch(/hello/)
  })
})
```

#### Example in Mocha/Chai
To use async/await functions, double check that your testing environment supports or transpiles them

```js
describe('waitUntil', () => {
  let page, wrapper

  beforeEach(() => {
    page = new Page(<App />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('works with asynchronicity', () => {
    expect(page.findWrapperForClickButton('click me').exists()).to.equal(false)
    return page.waitUntil(() => page.findWrapperForClickButton('click me').exists())
    .then(() => {
      page.clickButton('click me')
      expect(page.content()).not.to.match(/hello/)
      return page.waitUntil(() => page.contentMatches(/hello/))
    })
    .then(() => {
      expect(page.content()).to.match(/hello/)
    })
  })

  it('works with asynchronicity - using async function', async () => {
    expect(page.findWrapperForClickButton('click me').exists()).to.equal(false)
    await page.waitUntil(() => page.findWrapperForClickButton('click me').exists())
    page.clickButton('click me')
    expect(page.content()).not.to.match(/hello/)
    await page.waitUntil(() => page.contentMatches(/hello/))
    expect(page.content()).to.match(/hello/)
  })
})
```

#### Example in Jasmine
To use async/await functions, double check that your testing environment supports or transpiles them

```js
function asyncTest(callback) {
  return done => {
    callback().then(done, error => done.fail(error.message))
  }
}

describe('waitUntil', () => {
  let page, wrapper

  beforeEach(() => {
    page = new Page(<App />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('works with asynchronicity', done => {
    expect(page.findWrapperForClickButton('click me').exists()).toEqual(false)
    return page.waitUntil(() => page.findWrapperForClickButton('click me').exists())
    .then(() => {
      page.clickButton('click me')
      expect(page.content()).not.toMatch(/hello/)
      return page.waitUntil(() => page.contentMatches(/hello/))
    })
    .then(() => {
      expect(page.content()).toMatch(/hello/)
    })
    .then(done, error => done.fail(error.message))
  })

  it('works with asynchronicity - using async function and asyncTest helper method', asyncTest(async () => {
    expect(page.findWrapperForClickButton('click me').exists()).toEqual(false)
    await page.waitUntil(() => page.findWrapperForClickButton('click me').exists())
    page.clickButton('click me')
    expect(page.content()).not.toMatch(/hello/)
    await page.waitUntil(() => page.contentMatches(/hello/))
    expect(page.content()).toMatch(/hello/)
  }))
})
```
