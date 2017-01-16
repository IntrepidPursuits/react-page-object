### `.findWrapperForChoose(propValue[, options]) => ReactWrapper`

Find a radio button

**Default Checked Props:** `id` and `name`

#### Arguments

1. `propValue` (`String`): Value is compared with the values of the checked props to assert a match.
2. `options` (`Object`): Optional.
  * `propToCheck` (`String`): Name of prop to check against instead of the default checked props.

#### Returns

[`ReactWrapper`][react-wrapper] for an `input` React element whose:
  1. `id` or `name` prop value equals `propValue`
  2. `type` prop value equals `'radio'`

If `options.propToCheck` is specified, then the method returns a
[`ReactWrapper`][react-wrapper] for an `input` React element whose:
  1. value for the prop specified by `options.propToCheck` equals `propValue`
  2. `type` prop value equals `'radio'`

#### Related Methods

- [`.choose(propValue[, options]) => ReactWrapper`](choose.md)

[react-wrapper]: https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md#reactwrapper-api
