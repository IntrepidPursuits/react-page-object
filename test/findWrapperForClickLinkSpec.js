import React from 'react'
import Page from 'react-page-object'

describe('findWrapperForClickLinkSpec', () => {
  let page
  const LinksDefault = () => (
    <div>
      <a id="propValue" />
      <a>propValue</a>
      <a href="propValue" />
      <a />
    </div>
  )
  const LinksCustom = () => (
    <div>
      <a className="propValue" />
      <a id="propValue" />
      <a>propValue</a>
      <a href="propValue" />
      <a />
    </div>
  )

  afterEach(() => {
    page.destroy()
  })

  describe('no options given', () => {
    it('should return ReactWrappers for links whose id, children, or href props match the propValue', () => {
      page = new Page(<LinksDefault />)
      const wrapper = page.findWrapperForClickLink('propValue')
      expect(wrapper.length).toEqual(3)
      expect(wrapper.every('a')).toEqual(true)
    })
  })

  describe('propToCheck option is specified with className', () => {
    it('should return a ReactWrapper for the link whose className prop matches the propValue', () => {
      page = new Page(<LinksCustom />)
      const wrapper = page.findWrapperForClickLink('propValue', { propToCheck: 'className' })
      expect(wrapper.html()).toEqual('<a class="propValue"></a>')
    })
  })
})
