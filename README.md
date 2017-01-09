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
#### `.findWrapperForCheck(propValue[, options]) => ReactWrapper`

Returns a [`ReactWrapper`][react-wrapper] for an `input` React element whose:
  1. `id` or `name` props equal `propValue`
  2. `type` prop equals `'checkbox'`

Optionally takes an `options` object as a second argument.

If `options.propToCheck` is specified, then the method returns a
[`ReactWrapper`][react-wrapper] for an `input` React element whose:
  1. prop specified by `options.propToCheck` equals `propValue`
  2. `type` prop equals `'checkbox'`

#### `.findWrapperForChoose(propValue[, options]) => ReactWrapper`

Returns a [`ReactWrapper`][react-wrapper] for an `input` React element whose:
  1. `id` or `name` props equal `propValue`
  2. `type` prop equals `'radio'`

Optionally takes an `options` object as a second argument.

If `options.propToCheck` is specified, then the method returns a
[`ReactWrapper`][react-wrapper] for an `input` React element whose:
  1. prop specified by `options.propToCheck` equals `propValue`
  2. `type` prop equals `'radio'`

#### `.findWrapperForClickButton(propValue[, options]) => ReactWrapper`

Returns a [`ReactWrapper`][react-wrapper] for a `button` React element whose:
  1. `id` or `children` props equal `propValue`

Optionally takes an `options` object as a second argument.

If `options.propToCheck` is specified, then the method returns a
[`ReactWrapper`][react-wrapper] for a `button` React element whose:
  1. prop specified by `options.propToCheck` equals `propValue`

#### `.findWrapperForClickInput(propValue[, options]) => ReactWrapper`

Returns a [`ReactWrapper`][react-wrapper] for an `input` React element whose:
  1. `id` or `value` props equal `propValue`
  2. `type` prop equals `'submit'`

Optionally takes an `options` object as a second argument.

If `options.propToCheck` is specified, then the method returns a
[`ReactWrapper`][react-wrapper] for an `input` React element whose:
  1. prop specified by `options.propToCheck` equals `propValue`
  2. `type` prop equals `'submit'`

#### `.findWrapperForClickLink(propValue[, options]) => ReactWrapper`

Returns a [`ReactWrapper`][react-wrapper] for an `a` React element whose:
  1. `id`, `children`, or `href` props equal `propValue`

Optionally takes an `options` object as a second argument.

If `options.propToCheck` is specified, then the method returns a
[`ReactWrapper`][react-wrapper] for an `a` React element whose:
  1. prop specified by `options.propToCheck` equals `propValue`

#### `.findWrapperForFillIn(propValue[, options]) => ReactWrapper`

Returns a [`ReactWrapper`][react-wrapper] for an `input` React element whose:
  1. `id`, `name` or `placeholder` props equal `propValue`
  2. `type` prop is `undefined`, `'email'`, `'password'`, or `'text'`

Optionally takes an `options` object as a second argument.

If `options.propToCheck` is specified, then the method returns a
[`ReactWrapper`][react-wrapper] for an `input` React element whose:
  1. prop specified by `options.propToCheck` equals `propValue`
  2. `type` prop is `undefined`, `'email'`, `'password'`, or `'text'`

#### `.findWrapperForFillInTextarea(propValue[, options]) => ReactWrapper`

Returns a [`ReactWrapper`][react-wrapper] for a `textarea` React element whose:
  1. `id`, `name` or `placeholder` props equal `propValue`

Optionally takes an `options` object as a second argument.

If `options.propToCheck` is specified, then the method returns a
[`ReactWrapper`][react-wrapper] for a `textarea` React element whose:
  1. prop specified by `options.propToCheck` equals `propValue`

#### `.findWrapperForSelect(propValue, childrenPropValueForOption, [, options]) => ReactWrapper`

Returns a [`ReactWrapper`][react-wrapper] for a `select` React element whose:
  1. `id`, `name` props equal `propValue`
  2. `children` includes only one `option` React element whose `children` prop equals `childrenPropValueForOption`

Optionally takes an `options` object as a second argument.

If `options.propToCheck` is specified, then the method returns a
[`ReactWrapper`][react-wrapper] for a `select` React element whose:
  1. prop specified by `options.propToCheck` equals `propValue`
  2. `children` includes only one `option` React element whose `children` prop equals `childrenPropValueForOption`

If `options.showDebuggingInfo` is specified with `true`, then messages
detailing the process of finding a `select` React element will be outputted to
the console.

### Interaction Methods
#### `.blurLastTouchedElement()`
Use this method to blur the last element which was focused.

#### `.check(propValue[, options])`
Use this method to check a checkbox. The arguments of this method will be used
by the `findWrapperForCheck` method to find a checkbox.

#### `.choose(propValue[, options])`
Use this method to select a radio button. The arguments of this method will be used
by the `findWrapperForChoose` method to find a radio button.

#### `.clickButton(propValue[, options])`
Use this method to click on a button element. The arguments of this method will be
used by the `findWrapperForButton` method to find a button.

#### `.clickInput(propValue[, options])`
Use this method to click on a clickable input element. The arguments of this method will be
used by the `findWrapperForClickInput` method to find an input.

#### `.clickLink(propValue[, options])`
Use this method to click on a link. The arguments of this method will be
used by the `findWrapperForClickLink` method to find a link.

#### `.fillIn(propValue, eventTargetValue, [, options])`
Use this method to fill in a text input. The `propValue` and `options` arguments of this method will be
used by the `findWrapperForFillIn` method to find a text input. Any `onChange` event handlers triggered will
receive an `event` object whose `target.value` will equal `eventTargetValue`.

#### `.fillInTextarea(propValue, eventTargetValue, [, options])`
Use this method to fill in a textarea. The `propValue` and `options` arguments of this method will be
used by the `findWrapperForFillInTextarea` method to find a textarea. Any `onChange` event handlers triggered will
receive an `event` object whose `target.value` will equal `eventTargetValue`.

#### `.uncheck(propValue[, options])`
Use this method to uncheck a checkbox. The arguments of this method will be used
by the `findWrapperForCheck` method to find a checkbox.

#### `.select(propValue, childrenPropValueForOption, [, options])`
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

[react-wrapper]: https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md#reactwrapper-api
