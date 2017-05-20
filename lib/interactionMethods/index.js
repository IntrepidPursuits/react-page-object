import checkOnlyOneNodeExists from './checkOnlyOneNodeExists'
import blurAndFocusWrappersIfNecessary from './blurAndFocusWrappersIfNecessary'

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
  blurAndFocusWrappersIfNecessary(this, wrapper)
  const { name, value = 'on' } = wrapper.props()
  wrapper.simulate('change', {
    target: {
      checked: true,
      type: 'checkbox',
      name,
      value
    }
  })

  return this
}

export function choose(propValue, options) {
  const findWrapperMethodArguments = [propValue, options]
  const wrapper = this.findWrapperForChoose(...findWrapperMethodArguments)
  checkOnlyOneNodeExists(wrapper, 'choose', findWrapperMethodArguments, arguments)
  blurAndFocusWrappersIfNecessary(this, wrapper)
  const { name, value = 'on' } = wrapper.props()
  wrapper.simulate('change', {
    target: {
      checked: true,
      type: 'radio',
      name,
      value
    }
  })

  return this
}

export function clickButton(propValue, options) {
  const findWrapperMethodArguments = [propValue, options]
  const wrapper = this.findWrapperForClickButton(...findWrapperMethodArguments)
  checkOnlyOneNodeExists(wrapper, 'clickButton', findWrapperMethodArguments, arguments)
  blurAndFocusWrappersIfNecessary(this, wrapper)
  wrapper.simulate('click')
  wrapper.simulate('submit')
  return this
}

export function clickInput(propValue, options) {
  const findWrapperMethodArguments = [propValue, options]
  const wrapper = this.findWrapperForClickInput(...findWrapperMethodArguments)
  checkOnlyOneNodeExists(wrapper, 'clickInput', findWrapperMethodArguments, arguments)
  blurAndFocusWrappersIfNecessary(this, wrapper)
  wrapper.simulate('click')
  wrapper.simulate('submit')
  return this
}

export function clickLink(propValue, options) {
  const findWrapperMethodArguments = [propValue, options]
  const wrapper = this.findWrapperForClickLink(...findWrapperMethodArguments)
  checkOnlyOneNodeExists(wrapper, 'clickLink', findWrapperMethodArguments, arguments)
  blurAndFocusWrappersIfNecessary(this, wrapper)
  wrapper.simulate('click', { button: 0 })
  return this
}

export function fillIn(propValue, eventTargetValue, options) {
  const findWrapperMethodArguments = [propValue, options]
  const wrapper = this.findWrapperForFillIn(...findWrapperMethodArguments)
  checkOnlyOneNodeExists(wrapper, 'fillIn', findWrapperMethodArguments, arguments)
  blurAndFocusWrappersIfNecessary(this, wrapper)
  wrapper.simulate('change', {
    target: {
      value: eventTargetValue,
      name: wrapper.props().name
    }
  })
  return this
}

export function fillInTextarea(propValue, eventTargetValue, options) {
  const findWrapperMethodArguments = [propValue, options]
  const wrapper = this.findWrapperForFillInTextarea(...findWrapperMethodArguments)
  checkOnlyOneNodeExists(wrapper, 'fillInTextarea', findWrapperMethodArguments, arguments)
  blurAndFocusWrappersIfNecessary(this, wrapper)
  wrapper.simulate('change', {
    target: {
      value: eventTargetValue,
      name: wrapper.props().name
    }
  })
  return this
}

export function select(propValue, childrenPropValueForOption, options) {
  const findWrapperMethodArguments = [propValue, childrenPropValueForOption, options]
  const wrapper = this.findWrapperForSelect(...findWrapperMethodArguments)
  checkOnlyOneNodeExists(wrapper, 'select', findWrapperMethodArguments, arguments)
  const option = wrapper.find(`option[children="${childrenPropValueForOption}"]`)
  const optionValue = option.props().value
  blurAndFocusWrappersIfNecessary(this, wrapper)
  wrapper.simulate('change', {
    target: {
      value: optionValue,
      name: wrapper.props().name
    }
  })
  return this
}

export function uncheck(propValue, options) {
  const findWrapperMethodArguments = [propValue, options]
  const wrapper = this.findWrapperForCheck(...findWrapperMethodArguments)
  checkOnlyOneNodeExists(wrapper, 'check', findWrapperMethodArguments, arguments)
  blurAndFocusWrappersIfNecessary(this, wrapper)
  const { name, value = 'on' } = wrapper.props()
  wrapper.simulate('change', {
    target: {
      checked: false,
      type: 'checkbox',
      name,
      value
    }
  })
  return this
}
