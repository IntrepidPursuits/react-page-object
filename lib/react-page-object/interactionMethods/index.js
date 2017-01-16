import checkOnlyOneNodeExists from './checkOnlyOneNodeExists'
import focusAndBlurWrappersIfNecessary from './focusAndBlurWrappersIfNecessary'

export function blurFocusedElement() {
  if (this.focusedWrapper) {
    this.focusedWrapper.simulate('blur')
    this.focusedWrapper = null
  }
  return this
}

export function check(propValue, options) {
  const findWrapperMethodArguments = [propValue, options]
  const wrapper = this.findWrapperForCheck(...findWrapperMethodArguments)
  checkOnlyOneNodeExists(wrapper, 'check', findWrapperMethodArguments, arguments)
  focusAndBlurWrappersIfNecessary(this, wrapper)
  wrapper.simulate('change', {
    target: {
      checked: true,
      type: 'checkbox',
      value: wrapper.props().value || 'on',
    }
  })

  return this
}

export function choose(propValue, options) {
  const findWrapperMethodArguments = [propValue, options]
  const wrapper = this.findWrapperForChoose(...findWrapperMethodArguments)
  checkOnlyOneNodeExists(wrapper, 'choose', findWrapperMethodArguments, arguments)
  focusAndBlurWrappersIfNecessary(this, wrapper)
  wrapper.simulate('change', {
    target: {
      checked: true,
      type: 'radio',
      value: wrapper.props().value || 'on',
    }
  })

  return this
}

export function clickButton(propValue, options) {
  const findWrapperMethodArguments = [propValue, options]
  const wrapper = this.findWrapperForClickButton(...findWrapperMethodArguments)
  checkOnlyOneNodeExists(wrapper, 'clickButton', findWrapperMethodArguments, arguments)
  focusAndBlurWrappersIfNecessary(this, wrapper)
  wrapper.simulate('click')
  wrapper.simulate('submit')
  return this
}

export function clickInput(propValue, options) {
  const findWrapperMethodArguments = [propValue, options]
  const wrapper = this.findWrapperForClickInput(...findWrapperMethodArguments)
  checkOnlyOneNodeExists(wrapper, 'clickInput', findWrapperMethodArguments, arguments)
  focusAndBlurWrappersIfNecessary(this, wrapper)
  wrapper.simulate('click')
  wrapper.simulate('submit')
  return this
}

export function clickLink(propValue, options) {
  const findWrapperMethodArguments = [propValue, options]
  const wrapper = this.findWrapperForClickLink(...findWrapperMethodArguments)
  checkOnlyOneNodeExists(wrapper, 'clickLink', findWrapperMethodArguments, arguments)
  focusAndBlurWrappersIfNecessary(this, wrapper)
  wrapper.simulate('click', { button: 0 })
  return this
}

export function fillIn(propValue, eventTargetValue, options) {
  const findWrapperMethodArguments = [propValue, options]
  const wrapper = this.findWrapperForFillIn(...findWrapperMethodArguments)
  checkOnlyOneNodeExists(wrapper, 'fillIn', findWrapperMethodArguments, arguments)
  focusAndBlurWrappersIfNecessary(this, wrapper)
  wrapper.simulate('change', { target: { value: eventTargetValue } })
  return this
}

export function fillInTextarea(propValue, eventTargetValue, options) {
  const findWrapperMethodArguments = [propValue, options]
  const wrapper = this.findWrapperForFillInTextarea(...findWrapperMethodArguments)
  checkOnlyOneNodeExists(wrapper, 'fillInTextarea', findWrapperMethodArguments, arguments)
  focusAndBlurWrappersIfNecessary(this, wrapper)
  wrapper.simulate('change', { target: { value: eventTargetValue } })
  return this
}

export function select(propValue, childrenPropValueForOption, options) {
  const findWrapperMethodArguments = [propValue, childrenPropValueForOption, options]
  const wrapper = this.findWrapperForSelect(...findWrapperMethodArguments)
  checkOnlyOneNodeExists(wrapper, 'select', findWrapperMethodArguments, arguments)
  const option = wrapper.find(`option[children="${childrenPropValueForOption}"]`)
  const optionValue = option.props().value
  focusAndBlurWrappersIfNecessary(this, wrapper)
  wrapper.simulate('change', { target: { value: optionValue } })
  return this
}

export function uncheck(propValue, options) {
  const findWrapperMethodArguments = [propValue, options]
  const wrapper = this.findWrapperForCheck(...findWrapperMethodArguments)
  checkOnlyOneNodeExists(wrapper, 'check', findWrapperMethodArguments, arguments)
  focusAndBlurWrappersIfNecessary(this, wrapper)
  wrapper.simulate('change', {
    target: {
      checked: false,
      type: 'checkbox',
      value: wrapper.props().value || 'on',
    }
  })
  return this
}
