# react-page-object
Declarative testing for React

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

#### [`.findWrapperForSelect(propValue, childrenPropValueForOption, [, options]) => ReactWrapper`](docs/api/select.md)
Find a select box

### Interaction Methods
#### `.blurLastTouchedElement() => Page`
Use this method to blur the last element which was focused.

#### `.check(propValue[, options]) => Page`
Use this method to check a checkbox. The arguments of this method will be used
by the `findWrapperForCheck` method to find a checkbox.

#### `.choose(propValue[, options]) => Page`
Use this method to select a radio button. The arguments of this method will be used
by the `findWrapperForChoose` method to find a radio button.

#### `.clickButton(propValue[, options]) => Page`
Use this method to click on a button element. The arguments of this method will be
used by the `findWrapperForButton` method to find a button.

#### `.clickInput(propValue[, options]) => Page`
Use this method to click on a clickable input element. The arguments of this method will be
used by the `findWrapperForClickInput` method to find an input.

#### `.clickLink(propValue[, options]) => Page`
Use this method to click on a link. The arguments of this method will be
used by the `findWrapperForClickLink` method to find a link.

#### `.fillIn(propValue, eventTargetValue, [, options]) => Page`
Use this method to fill in a text input. The `propValue` and `options` arguments of this method will be
used by the `findWrapperForFillIn` method to find a text input. Any `onChange` event handlers triggered will
receive an `event` object whose `target.value` will equal `eventTargetValue`.

#### `.fillInTextarea(propValue, eventTargetValue, [, options]) => Page`
Use this method to fill in a textarea. The `propValue` and `options` arguments of this method will be
used by the `findWrapperForFillInTextarea` method to find a textarea. Any `onChange` event handlers triggered will
receive an `event` object whose `target.value` will equal `eventTargetValue`.

#### `.uncheck(propValue[, options]) => Page`
Use this method to uncheck a checkbox. The arguments of this method will be used
by the `findWrapperForCheck` method to find a checkbox.

#### `.select(propValue, childrenPropValueForOption, [, options]) => Page`
Use this method to select an option from a select dropdown. The arguments of this method will be used
by the `findWrapperForSelect` method to find the select dropdown.

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
