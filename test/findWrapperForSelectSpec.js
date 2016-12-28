import React from 'react'
import Page from 'react-page-object'

describe('findWrapperForSelectSpec', () => {
  let page
  const SelectsDefault = () => (
    <div>
      <select id="propValue">
        <option>optionText</option>
      </select>
      <select name="propValue">
        <option>optionText</option>
      </select>
      <select>
        <option>optionText</option>
      </select>

      <select id="propValue" />
      <select name="propValue" />
      <select />
    </div>
  )
  const SelectsCustom = () => (
    <div>
      <select className="propValue">
        <option>optionText</option>
      </select>
      <select id="propValue">
        <option>optionText</option>
      </select>
      <select name="propValue">
        <option>optionText</option>
      </select>
      <select>
        <option>optionText</option>
      </select>

      <select className="propValue" />
      <select id="propValue" />
      <select name="propValue" />
      <select />
    </div>
  )
  const SelectsDebuggingWithNoMatchingSelectOrOption = () => (
    <div>
      <select id="propValue does not match">
        <option>not matching optionText</option>
      </select>
    </div>
  )
  const SelectsDebuggingWithMatchingSelectOnly = () => (
    <div>
      <select id="propValue">
        <option>not matching optionText</option>
      </select>
    </div>
  )
  const SelectsDebuggingWithMatch = () => (
    <div>
      <select id="propValue">
        <option>optionText</option>
      </select>
    </div>
  )
  const SelectsDebuggingWithMultipleOptionMatches = () => (
    <div>
      <select id="propValue">
        <option>optionText</option>
        <option>optionText</option>
      </select>
    </div>
  )

  afterEach(() => {
    page.destroy()
  })

  describe('no options given', () => {
    it('should return ReactWrappers for selects whose id or name props match the propValue and have a child option wrapper that has its children prop value match the option value', () => {
      page = new Page(<SelectsDefault />)
      const wrapper = page.findWrapperForSelect('propValue', 'optionText')
      expect(wrapper.length).toEqual(2)
      expect(wrapper.every('select')).toEqual(true)
    })
  })

  describe('propToCheck option is specified with className', () => {
    it('should return ReactWrappers for selects whose className prop matches the propValue and has a child option wrapper that has its children prop value match the option value', () => {
      page = new Page(<SelectsCustom />)
      const wrapper = page.findWrapperForSelect('propValue', 'optionText', { propToCheck: 'className' })
      expect(wrapper.html()).toEqual('<select class="propValue"><option>optionText</option></select>')
    })
  })

  describe('showDebuggingInfo option is specified with true', () => {
    describe('component with select wrapper does not match neither its prop value or its option value', () => {
      it('should output a message that a select wrapper was matched by its prop value, but not its option value', () => {
        window.spyOn(console, 'log')
        page = new Page(<SelectsDebuggingWithNoMatchingSelectOrOption />)
        page.findWrapperForSelect('propValue', 'optionText', { showDebuggingInfo: true })
        expect(console.log).toHaveBeenCalledWith(`no select React element was found whose id or name prop value matches 'propValue'`)
      })
    })

    describe('component with select wrapper with matching prop value only', () => {
      it('should output a message that a select wrapper was matched by its prop value, but not its option value', () => {
        window.spyOn(console, 'log')
        page = new Page(<SelectsDebuggingWithMatchingSelectOnly />)
        page.findWrapperForSelect('propValue', 'optionText', { showDebuggingInfo: true })
        expect(console.log).toHaveBeenCalledWith(`matching select React element was found, but its children did not include an option React element whose children prop value matched 'optionText': <select id="propValue"><option>not matching optionText</option></select>`)
      })
    })

    describe('component with select wrapper with matching prop value and option value', () => {
      it('should output a message that a select wrapper was matched by both its prop value and option value', () => {
        window.spyOn(console, 'log')
        page = new Page(<SelectsDebuggingWithMatch />)
        page.findWrapperForSelect('propValue', 'optionText', { showDebuggingInfo: true })
        expect(console.log).toHaveBeenCalledWith(`matching select React element whose children include a matching option React element was found: <select id="propValue"><option>optionText</option></select>`)
      })
    })

    describe('component with select wrapper with matching prop value and multiple matching option values', () => {
      it('should output a message that a select wrapper was matched by its prop value and multiple option values', () => {
        window.spyOn(console, 'log')
        page = new Page(<SelectsDebuggingWithMultipleOptionMatches />)
        page.findWrapperForSelect('propValue', 'optionText', { showDebuggingInfo: true })
        expect(console.log).toHaveBeenCalledWith(`matching select React element was found, but its children include more than one option React element whose children prop value matched 'optionText': <select id="propValue"><option>optionText</option><option>optionText</option></select>`)
      })
    })
  })
})
