import React from 'react'
import Page from 'react-page-object'

describe('findWrapperForFillInTextareaSpec', () => {
  let page
  const TextareasDefault = () => (
    <div>
      <textarea id="propValue" />
      <textarea name="propValue" />
      <textarea placeholder="propValue" />
      <textarea />
    </div>
  )
  const TextareasCustom = () => (
    <div>
      <textarea className="propValue" />
      <textarea id="propValue" />
      <textarea name="propValue" />
      <textarea placeholder="propValue" />
      <textarea />
    </div>
  )

  afterEach(() => {
    page.destroy()
  })

  describe('no options given', () => {
    it('should return ReactWrappers for textareas whose id, name, or place props match the propValue', () => {
      page = new Page(<TextareasDefault />)
      const wrapper = page.findWrapperForFillInTextarea('propValue')
      expect(wrapper.length).toEqual(3)
      expect(wrapper.every('textarea')).toEqual(true)
    })
  })

  describe('propToCheck option is specified with className', () => {
    it('should return a ReactWrapper for the textarea whose className prop matches the propValue', () => {
      page = new Page(<TextareasCustom />)
      const wrapper = page.findWrapperForFillInTextarea('propValue', { propToCheck: 'className' })
      expect(wrapper.html()).toEqual('<textarea class="propValue"></textarea>')
    })
  })
})
