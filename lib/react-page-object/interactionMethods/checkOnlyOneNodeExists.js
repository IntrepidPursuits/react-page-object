const formatArgs = args => {
  return args
    .filter(arg => arg !== undefined)
    .map(arg => {
      switch (typeof arg) {
        case 'string':
          return `'${arg}'`
        case 'object':
          return JSON.stringify(arg)
        default:
          return ''
      }
    })
    .join(', ')
}

export default function checkOnlyOneNodeExists(wrapper, methodName, findWrapperMethodArguments, args) {
  const wrapperLength = wrapper.length

  if (wrapperLength !== 1) {
    let message
    const formattedArgs = formatArgs(Array.prototype.slice.call(args))
    const formattedFindWrapperMethodArgs = formatArgs(findWrapperMethodArguments)
    const findWrapperMethodName = `findWrapperFor${methodName.charAt(0).toUpperCase() + methodName.slice(1)}`
    if (wrapperLength === 0) {
      message = `.${methodName}(${formattedArgs}) failed because no matching React elements were found by .${findWrapperMethodName}(${formattedFindWrapperMethodArgs})`
    }

    if (wrapperLength > 1) {
      message = `.${methodName}(${formattedArgs}) failed because ${wrapperLength} matching React elements were found by .${findWrapperMethodName}(${formattedFindWrapperMethodArgs})`
    }

    throw new Error(message)
  }
}
