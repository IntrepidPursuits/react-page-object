### `.findWrapperForClickButton(propValue[, options]) => ReactWrapper`

Find a button

**Default Checked Props:** `id` and `children`

#### Arguments

1. `propValue` (`String`): Value is compared with the values of the checked props to assert a match.
2. `options` (`Object`): Optional.
  * `propToCheck` (`String`): Name of prop to check against instead of the default checked props.

#### Returns

[`ReactWrapper`][react-wrapper] for a `button` React element whose:
  1. `id` or `children` prop value equals `propValue`

If `options.propToCheck` is specified, then the method returns a
[`ReactWrapper`][react-wrapper] for a `button` React element whose:
  1. value for the prop specified by `options.propToCheck` equals `propValue`

#### Related Methods

- [`.clickButton(propValue[, options]) => ReactWrapper`](clickButton.md)

[react-wrapper]: https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md#reactwrapper-api
