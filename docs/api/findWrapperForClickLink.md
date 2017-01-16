### `.findWrapperForClickLink(propValue[, options]) => ReactWrapper`

Find a link

**Default Checked Props:** `id`, `children`, and `href`

#### Arguments

1. `propValue` (`String`): Value is compared with the values of the checked props to assert a match.
2. `options` (`Object`): Optional.
  * `propToCheck` (`String`): Name of prop to check against instead of the default checked props.

#### Returns

[`ReactWrapper`][react-wrapper] for an `a` React element whose:
  1. `id`, `children`, or `href` prop value equals `propValue`

If `options.propToCheck` is specified, then the method returns a
[`ReactWrapper`][react-wrapper] for an `a` React element whose:
  1. value for the prop specified by `options.propToCheck` equals `propValue`

#### Related Methods

- [`.clickLink(propValue[, options]) => ReactWrapper`](clickLink.md)

[react-wrapper]: https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md#reactwrapper-api
