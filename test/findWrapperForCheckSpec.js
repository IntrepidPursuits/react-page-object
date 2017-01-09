import React from 'react'
import Page from 'react-page-object'

describe('findWrapperForCheckSpec', () => {
  let page
  const InputsDefault = () => (
    <div>
      <input type="checkbox" id="propValue" />
      <input type="checkbox" name="propValue" />
      <input type="checkbox" />
      <input id="propValue" />
      <input name="propValue" />
      <input />
    </div>
  )
  const InputsCustom = () => (
    <div>
      <input type="checkbox" className="propValue" />
      <input type="checkbox" id="propValue" />
      <input type="checkbox" name="propValue" />
      <input type="checkbox" />
      <input className="propValue" />
      <input id="propValue" />
      <input name="propValue" />
      <input />
    </div>
  )

  afterEach(() => {
    page.destroy()
  })

  describe('no options given', () => {
    it('should return ReactWrappers for inputs whose type prop value is \'checkbox\' and id or name props match the propValue', () => {
      page = new Page(<InputsDefault />)
      const wrapper = page.findWrapperForCheck('propValue')
      expect(wrapper.length).toEqual(2)
      expect(wrapper.every('input')).toEqual(true)
    })
  })

  describe('propToCheck option is specified with className', () => {
    it('should return ReactWrappers for inputs whose type prop value is \'checkbox\' and className prop matches the propValue', () => {
      page = new Page(<InputsCustom />)
      const wrapper = page.findWrapperForCheck('propValue', { propToCheck: 'className' })
      expect(wrapper.html()).toEqual('<input type="checkbox" class="propValue" value="on">')
    })
  })
})
