import React from 'react'
import Page from 'react-page-object'

describe('findWrapperForClickInputSpec', () => {
  let page
  const InputsDefault = () => (
    <div>
      <input type="submit" id="propValue" />
      <input type="submit" value="propValue" />
      <input type="submit" />
      <input id="propValue" />
      <input value="propValue" readOnly />
      <input />
    </div>
  )
  const InputsCustom = () => (
    <div>
      <input type="submit" className="propValue" />
      <input type="submit" id="propValue" />
      <input type="submit" value="propValue" />
      <input type="submit" />
      <input className="propValue" />
      <input id="propValue" />
      <input value="propValue" readOnly />
      <input />
    </div>
  )

  afterEach(() => {
    page.destroy()
  })

  describe('no options given', () => {
    it('should return ReactWrappers for inputs whose type prop value is \'submit\' and id or value props match the propValue', () => {
      page = new Page(<InputsDefault />)
      const wrapper = page.findWrapperForClickInput('propValue')
      expect(wrapper.length).toEqual(2)
      expect(wrapper.every('input')).toEqual(true)
    })
  })

  describe('propToCheck option is specified with className', () => {
    it('should return ReactWrappers for inputs whose type prop value is \'submit\' and className prop matches the propValue', () => {
      page = new Page(<InputsCustom />)
      const wrapper = page.findWrapperForClickInput('propValue', { propToCheck: 'className' })
      expect(wrapper.html()).toEqual('<input type="submit" class="propValue">')
    })
  })
})
