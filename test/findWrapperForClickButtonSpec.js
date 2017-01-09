import React from 'react'
import Page from 'react-page-object'

describe('findWrapperForClickButtonSpec', () => {
  let page
  const ButtonsDefault = () => (
    <div>
      <button id="propValue" />
      <button>propValue</button>
      <button />
    </div>
  )
  const ButtonsCustom = () => (
    <div>
      <button className="propValue" />
      <button id="propValue" />
      <button value="propValue" />
      <button>propValue</button>
      <button />
    </div>
  )

  afterEach(() => {
    page.destroy()
  })

  describe('no options given', () => {
    it('should return ReactWrappers for buttons whose id or children props match the propValue', () => {
      page = new Page(<ButtonsDefault />)
      const wrapper = page.findWrapperForClickButton('propValue')
      expect(wrapper.length).toEqual(2)
      expect(wrapper.every('button')).toEqual(true)
    })
  })

  describe('propToCheck option is specified with className', () => {
    it('should return a ReactWrapper for the button whose className prop matches the propValue', () => {
      page = new Page(<ButtonsCustom />)
      const wrapper = page.findWrapperForClickButton('propValue', { propToCheck: 'className' })
      expect(wrapper.html()).toEqual('<button class="propValue"></button>')
    })
  })
})
