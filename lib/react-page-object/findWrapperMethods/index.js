import formatPropsToCheck from './formatPropsToCheck'

export function findWrapperForCheck(propValue, { propToCheck } = {}) {
  const propsToCheck = propToCheck ? [propToCheck] : ['id', 'name']
  return this.findWrapper('input', propValue, {
    propsToCheck,
    requiredProps: { type: ['checkbox'] }
  })
}

export function findWrapperForChoose(propValue, { propToCheck } = {}) {
  const propsToCheck = propToCheck ? [propToCheck] : ['id', 'name']
  return this.findWrapper('input', propValue, {
    propsToCheck,
    requiredProps: { type: ['radio'] }
  })
}

export function findWrapperForClickButton(propValue, { propToCheck } = {}) {
  const propsToCheck = propToCheck ? [propToCheck] : ['id', 'children']
  return this.findWrapper('button', propValue, { propsToCheck })
}

export function findWrapperForClickInput(propValue, { propToCheck } = {}) {
  const propsToCheck = propToCheck ? [propToCheck] : ['id', 'value']
  return this.findWrapper('input', propValue, {
    propsToCheck,
    requiredProps: { type: ['submit'] }
  })
}

export function findWrapperForClickLink(propValue, { propToCheck } = {}) {
  const propsToCheck = propToCheck ? [propToCheck] : ['id', 'children', 'href']
  return this.findWrapper('a', propValue, { propsToCheck })
}

export function findWrapperForFillIn(propValue, { propToCheck } = {}) {
  const propsToCheck = propToCheck ? [propToCheck] : ['id', 'name', 'placeholder']
  return this.findWrapper('input', propValue, {
    propsToCheck,
    requiredProps: { type: [undefined, 'email', 'password', 'text'] }
  })
}

export function findWrapperForFillInTextarea(propValue, { propToCheck } = {}) {
  const propsToCheck = propToCheck ? [propToCheck] : ['id', 'name', 'placeholder']
  return this.findWrapper('textarea', propValue, { propsToCheck })
}

export function findWrapperForSelect(propValue, childrenPropValueForOption, { propToCheck, showDebuggingInfo } = {}) {
  const propsToCheck = propToCheck ? [propToCheck] : ['id', 'name']
  let foundSelectWrapper = false

  const wrapper = this.wrapper.findWhere(wrapper => {
    if (wrapper.type() !== 'select') {
      return false
    }

    const wrapperProps = wrapper.props()
    const hasMatchingPropValue = propsToCheck.some(propName => {
      const wrapperPropValue = wrapperProps[propName]
      return wrapperPropValue === propValue
    })
    const matchingOptions = wrapper.find(`option[children="${childrenPropValueForOption}"]`)
    const hasMatchingOptions = matchingOptions.exists()
    const hasOnlyOneMatchingOption = hasMatchingOptions && matchingOptions.length === 1

    if (showDebuggingInfo && hasMatchingPropValue) {
      foundSelectWrapper = true
      hasMatchingOptions ?
        hasOnlyOneMatchingOption ?
          console.log(`matching select React element whose children include a matching option React element was found: ${wrapper.debug().replace(/\n\s*/g, '')}`) :
          console.log(`matching select React element was found, but its children include more than one option React element whose children prop value matched '${childrenPropValueForOption}': ${wrapper.debug().replace(/\n\s*/g, '')}`) :
        console.log(`matching select React element was found, but its children did not include an option React element whose children prop value matched '${childrenPropValueForOption}': ${wrapper.debug().replace(/\n\s*/g, '')}`)
    }

    return hasMatchingPropValue && hasOnlyOneMatchingOption
  })

  if (showDebuggingInfo && !foundSelectWrapper) {
    console.log(`no select React element was found whose ${formatPropsToCheck(propsToCheck)} prop value matches '${propValue}'`)
  }

  return wrapper
}

export function findWrapper(type, propValue, { propsToCheck = ['id'], requiredProps = {} } = {}) {
  return this.wrapper.findWhere(wrapper => {
    if (wrapper.type() !== type) {
      return false
    }

    const wrapperProps = wrapper.props()
    const hasRequiredProps = Object.keys(requiredProps).every(propName => {
      const validValuesForRequiredProp = requiredProps[propName]
      const wrapperRequiredPropValue = wrapperProps[propName]
      return validValuesForRequiredProp.indexOf(wrapperRequiredPropValue) !== -1
    })

    return hasRequiredProps && propsToCheck.some(propName => {
      const wrapperPropValue = wrapperProps[propName]
      return wrapperPropValue === propValue
    })
  })
}
