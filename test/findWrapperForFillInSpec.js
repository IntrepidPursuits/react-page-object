import React from 'react'
import Page from 'react-page-object'

describe('findWrapperForFillInSpec', () => {
  let page
  const InputsDefault = () => (
    <div>
      <input id="propValue" />
      <input name="propValue" />
      <input placeholder="propValue" />
      <input />

      <input type="email" id="propValue" />
      <input type="email" name="propValue" />
      <input type="email" placeholder="propValue" />
      <input type="email" />

      <input type="password" id="propValue" />
      <input type="password" name="propValue" />
      <input type="password" placeholder="propValue" />
      <input type="password" />

      <input type="submit" id="propValue" />
      <input type="submit" name="propValue" />
      <input type="submit" placeholder="propValue" />
      <input type="submit" />

      <input type="text" id="propValue" />
      <input type="text" name="propValue" />
      <input type="text" placeholder="propValue" />
      <input type="text" />
    </div>
  )
  const InputsCustom = () => (
    <div>
      <input className="propValue" />

      <input id="propValue" />
      <input name="propValue" />
      <input placeholder="propValue" />
      <input />

      <input type="email" id="propValue" />
      <input type="email" name="propValue" />
      <input type="email" placeholder="propValue" />
      <input type="email" />

      <input type="password" id="propValue" />
      <input type="password" name="propValue" />
      <input type="password" placeholder="propValue" />
      <input type="password" />

      <input type="submit" className="propValue" />
      <input type="submit" id="propValue" />
      <input type="submit" name="propValue" />
      <input type="submit" placeholder="propValue" />
      <input type="submit" />

      <input type="text" id="propValue" />
      <input type="text" name="propValue" />
      <input type="text" placeholder="propValue" />
      <input type="text" />
    </div>
  )

  afterEach(() => {
    page.destroy()
  })

  describe('no options given', () => {
    it('should return ReactWrappers for inputs whose type prop value is undefined, \'email\', \'password\', or \'text\' and id, name, or place props match the propValue', () => {
      page = new Page(<InputsDefault />)
      const wrapper = page.findWrapperForFillIn('propValue')
      expect(wrapper.length).toEqual(12)
      expect(wrapper.every('input')).toEqual(true)
    })
  })

  describe('propToCheck option is specified with className', () => {
    it('should return a ReactWrapper for the input whose type prop value is undefined, \'email\', \'password\', or \'text\' and className prop matches the propValue', () => {
      page = new Page(<InputsCustom />)
      const wrapper = page.findWrapperForFillIn('propValue', { propToCheck: 'className' })
      expect(wrapper.html()).toEqual('<input class="propValue">')
    })
  })
})
