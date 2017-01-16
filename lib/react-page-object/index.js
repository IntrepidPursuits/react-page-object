import { mount } from 'enzyme'
import * as findWrapperMethods from './findWrapperMethods'
import * as interactionMethods from './interactionMethods'
import * as utilityMethods from './utilityMethods'

const navigateTo = path => window.history.pushState({}, '', path)

class Page {
  constructor(reactElement, { initialPath = '/' } = {}) {
    navigateTo(initialPath)
    this.wrapper = mount(reactElement)
    this.focusedWrapper = null
  }

  destroy() {
    this.wrapper.unmount()
    navigateTo('/')
  }
}

Object.assign(
  Page.prototype,
  findWrapperMethods,
  interactionMethods,
  utilityMethods
)

export default Page
