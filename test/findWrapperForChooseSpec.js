import React from 'react'
import Page from 'react-page-object'

describe('findWrapperForChooseSpec', () => {
  let page
  const InputsDefault = () => (
    <div>
      <input type="radio" id="propValue" />
      <input type="radio" name="propValue" />
      <input type="radio" />
      <input id="propValue" />
      <input name="propValue" />
      <input />
    </div>
  )
  const InputsCustom = () => (
    <div>
      <input type="radio" className="propValue" />
      <input type="radio" id="propValue" />
      <input type="radio" name="propValue" />
      <input type="radio" />
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
    it('should return ReactWrappers for inputs whose type prop value is \'radio\' and id or name props match the propValue', () => {
      page = new Page(<InputsDefault />)
      const wrapper = page.findWrapperForChoose('propValue')
      expect(wrapper.length).toEqual(2)
      expect(wrapper.every('input')).toEqual(true)
    })
  })

  describe('propToCheck option is specified with className', () => {
    it('should return ReactWrappers for inputs whose type prop value is \'radio\' and className prop matches the propValue', () => {
      page = new Page(<InputsCustom />)
      const wrapper = page.findWrapperForChoose('propValue', { propToCheck: 'className' })
      expect(wrapper.html()).toEqual('<input type="radio" class="propValue" value="on">')
    })
  })
})
