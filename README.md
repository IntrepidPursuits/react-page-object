# React Page Object
This library gives you the ability to write the following integration tests:

```jsx
import React, { Component } from 'react'
import Page from 'react-page-object'

class Counter extends Component {
  state = { count: 0 }

  addOne = () => this.setState({ count: this.state.count + 1 })
  addOneAsync = () => setTimeout(this.addOne, 100)

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>}
        <button onClick={this.addOne}>Add one</button>
        <button onClick={this.addOneAsync}>Add one async</button>
      </div>
    )
  }
}

describe('Counter component', () => {
  let page

  beforeEach(() => {
    page = new Page(<Counter />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('sets the initial count to 0', () => {
    expect(page.content()).toMatch(/0/)
  })

  it('adds one to the count when the \'Add one\' button is clicked', () => {
    page.clickButton('Add one')
    expect(page.content()).toMatch(/1/)
  })

  it('adds one to the count after a delay when the \'Add one async\' button is clicked', async () => {
    page.clickButton('Add one async')
    expect(page.content()).not.toMatch(/0/)
    await page.waitUntil(() => page.contentMatches(/1/))
    expect(page.content()).toMatch(/1/)
  })
})
```

This was test written in Jest. However, This library can be used with any test
runner or assertion library that is compatible with
[`Enzyme`](https://github.com/airbnb/enzyme).

## Installation

```
$ npm install --save-dev react-page-object
```

`enzyme` is a peer dependency of `react-page-object`, so you will need to
install it if you have not done so already. Additionally, `react-dom` and
`react-addons-test-utils` are peer dependencies of `enzyme`, so install those
as well if you are missing them.

```
$ npm install --save-dev enzyme
$ npm install --save-dev react-dom
$ npm install --save-dev react-addons-test-utils
```

If you are new to testing in React, check out the following guides to get you up and running:

* [Set up with Jest in Create React App](docs/faq/installation-jest.md)
* [Set up Karma with Mocha and Chai in Create React App](docs/faq/installation-karma-mocha-chai.md)
* [Set up Karma with Jasmine in Create React App](docs/faq/installation-karma-jasmine.md)

## API
### Set Up Methods
#### `constructor(reactElement[, options]) => Page`
Navigates to the `/` path, mounts the given `reactElement` onto the DOM and returns a `Page` object.

Optionally takes an `options` object as a second argument.

Use `options.initialPath` to specify the initial path to navigate to before mounting the React element onto the DOM.

#### `.destroy()`
Unmounts the `reactElement` used to generate the `Page` object from the DOM. Navigates to `/`.
This method should be invoked on a `Page` object at the end of every test.

### Find Wrapper Methods
#### [`.findWrapperForCheck(propValue[, options]) => ReactWrapper`](docs/api/findWrapperForCheck.md)
Find a checkbox

#### [`.findWrapperForChoose(propValue[, options]) => ReactWrapper`](docs/api/findWrapperForChoose.md)
Find a radio button

#### [`.findWrapperForClickButton(propValue[, options]) => ReactWrapper`](docs/api/findWrapperForClickButton.md)
Find a button

#### [`.findWrapperForClickInput(propValue[, options]) => ReactWrapper`](docs/api/findWrapperForClickInput.md)
Find a clickable input

#### [`.findWrapperForClickLink(propValue[, options]) => ReactWrapper`](docs/api/findWrapperForClickLink.md)
Find a link

#### [`.findWrapperForFillIn(propValue[, options]) => ReactWrapper`](docs/api/findWrapperForFillIn.md)
Find a text input

#### [`.findWrapperForFillInTextarea(propValue[, options]) => ReactWrapper`](docs/api/findWrapperForFillInTextarea.md)
Find a textarea

#### [`.findWrapperForSelect(propValue, childrenPropValueForOption, [, options]) => ReactWrapper`](docs/api/findWrapperForSelect.md)
Find a select box

### Interaction Methods
#### [`.blurFocusedElement() => Page`](docs/api/blurFocusedElement.md)
Blur the currently focused element.

#### [`.check(propValue[, options]) => Page`](docs/api/check.md)
Check a checkbox

#### [`.choose(propValue[, options]) => Page`](docs/api/choose.md)
Choose a radio button

#### [`.clickButton(propValue[, options]) => Page`](docs/api/clickButton.md)
Click a button

#### [`.clickInput(propValue[, options]) => Page`](docs/api/clickInput.md)
Click a clickable input

#### [`.clickLink(propValue[, options]) => Page`](docs/api/clickLink.md)
Click a link

#### [`.fillIn(propValue, eventTargetValue[, options]) => Page`](docs/api/fillIn.md)
Fill in a text input

#### [`.fillInTextarea(propValue, eventTargetValue[, options]) => Page`](docs/api/fillInTextarea.md)
Fill in a textarea

#### [`.select(propValue, childrenPropValueForOption[, options]) => Page`](docs/api/select.md)
Select an option from a select box

#### [`.uncheck(propValue[, options]) => Page`](docs/api/uncheck.md)
Uncheck a checkbox

### Utility Methods
#### `.content() => String`
Returns a string containing all the text in the page.

#### `.contentMatches(matcher) => Boolean`
If `matcher` is a `String`, the method returns `true` if the string is a case
sensitive match of the text in the page. Otherwise, it returns `false`.

If `matcher` is a `RegExp`, the method returns `true` if the regular expression
matches the text in the page. Otherwise, returns `false`.

#### `.currentPath() => String`
Returns the current path of the page.

#### `.outputOpenPageCode()`
Outputs to the console a code snippet which should be pasted into a browser
console. When that code snippet is pasted, a new tab will open with the HTML of
the page at that point in the test.

#### `.waitUntil(callback[, options]) => Promise`
Returns a `Promise` which will be resolved when the `callback` returns `true`.
By default, the `callback` will be invoked 3 times every 500 milliseconds. If
the callback does not return `true` after the third invokation, then the
promise will be rejected. This method is useful for writing asynchronous feature tests.

Optionally takes an `options` object as a second argument.

Use `options.delay` to specify the number of milliseconds to wait for each interval before invoking `callback`.

Use `options.numberOfTries` to specify the number of times that the `callback` can be invoked before the returned promise is rejected.

## FAQs
* [Do you have additional examples?](docs/faq/do-you-have-additional-examples.md)
