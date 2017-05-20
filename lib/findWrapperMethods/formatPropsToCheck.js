export default function formatPropsToCheck(propsToCheck) {
  const propsToCheckLength = propsToCheck.length
  switch (propsToCheckLength) {
    case 1:
      return propsToCheck[0]
    case 2:
      return `${propsToCheck[0]} or ${propsToCheck[1]}`
    default:
      const lastProp = propsToCheck[propsToCheckLength - 1]
      return `${propsToCheck.slice(0, -1).join(', ')}, or ${lastProp}`
  }
}
