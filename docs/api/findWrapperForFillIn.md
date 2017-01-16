### `.findWrapperForFillIn(propValue[, options]) => ReactWrapper`

Find a text input

**Default Checked Props:** `id`, `name`, and `placeholder`

#### Arguments

1. `propValue` (`String`): Value is compared with the values of the checked props to assert a match.
2. `options` (`Object`): Optional.
  * `propToCheck` (`String`): Name of prop to check against instead of the default checked props.

#### Returns

[`ReactWrapper`][react-wrapper] for an `input` React element whose:
  1. `id`, `name` or `placeholder` prop value equals `propValue`
  2. `type` prop value is `undefined`, `'email'`, `'password'`, or `'text'`

If `options.propToCheck` is specified, then the method returns a
[`ReactWrapper`][react-wrapper] for an `input` React element whose:
  1. value for the prop specified by `options.propToCheck` equals `propValue`
  2. `type` prop value is `undefined`, `'email'`, `'password'`, or `'text'`

#### Related Methods

- [`.fillIn(propValue, eventTargetValue[, options]) => ReactWrapper`](fillIn.md)

[react-wrapper]: https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md#reactwrapper-api
