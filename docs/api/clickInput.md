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
