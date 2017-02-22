import React from 'react'
import Page from 'react-page-object'

describe('selectSpec', () => {
  let onBlur, onChange, onFocus, page
  const SelectsId = ({ onBlur, onChange, onFocus }) => (
    <div>
      <select id="propValue" onBlur={onBlur} onChange={onChange} onFocus={onFocus}>
        <option value="optionValue">childrenPropValueForOption</option>
      </select>
      <select id="secondPropValue">
        <option value="optionValue">childrenPropValueForOption</option>
      </select>
    </div>
  )
  const SelectsName = ({ onBlur, onChange, onFocus }) => (
    <div>
      <select name="propValue" onBlur={onBlur} onChange={onChange} onFocus={onFocus}>
        <option value="optionValue">childrenPropValueForOption</option>
      </select>
    </div>
  )
  const SelectsCustom = ({ onBlur, onChange, onFocus }) => (
    <div>
      <select className="propValue" onBlur={onBlur} onChange={onChange} onFocus={onFocus}>
        <option value="optionValue">childrenPropValueForOption</option>
      </select>
    </div>
  )

  beforeEach(() => {
    onBlur = window.jasmine.createSpy('onBlur');
    onChange = window.jasmine.createSpy('onChange');
    onFocus = window.jasmine.createSpy('onFocus');
  })

  afterEach(() => {
    page.destroy()
  })

  describe('no options given', () => {
    describe('select whose id prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <SelectsId
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
          />
        )
      })

      it('should trigger onChange event handler', () => {
        page.select('propValue', 'childrenPropValueForOption')
        expect(onChange).toHaveBeenCalled()
        const event = onChange.calls.first().args[0]
        expect(event.target).toEqual({ value: 'optionValue', name: undefined })
      })

      it('should trigger onFocus event handler upon first interaction', () => {
        page.select('propValue', 'childrenPropValueForOption')
        page.select('propValue', 'childrenPropValueForOption')
        expect(onFocus.calls.count()).toEqual(1)
      })

      it('should trigger onBlur event handler when a new wrapper is focused', () => {
        page.select('propValue', 'childrenPropValueForOption')
        page.select('propValue', 'childrenPropValueForOption')
        expect(onBlur).not.toHaveBeenCalled()
        page.select('secondPropValue', 'childrenPropValueForOption')
        expect(onBlur).toHaveBeenCalled()
      })

      it('should return the page object itself', () => {
        expect(page.select('propValue', 'childrenPropValueForOption')).toBe(page)
      })
    })

    describe('select whose name prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <SelectsName
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
          />
        )
      })

      it('should not raise an error describing that no matching React elements were found', () => {
        expect(() => page.select('propValue', 'childrenPropValueForOption')).not.toThrow()
      })
    })

    describe('no matching select', () => {
      beforeEach(() => {
        page = new Page(<div></div>)
      })

      it('should raise an error describing that no matching React elements were found', () => {
        expect(() => page.select('propValue', 'childrenPropValueForOption')).toThrowError(
          Error,
          '.select(\'propValue\', \'childrenPropValueForOption\') failed because no matching React elements were found by .findWrapperForSelect(\'propValue\', \'childrenPropValueForOption\')'
        )
      })
    })

    describe('two matching selects', () => {
      beforeEach(() => {
        page = new Page(
          <div>
            <select id="propValue">
              <option value="optionValue">childrenPropValueForOption</option>
            </select>
            <select id="propValue">
              <option value="optionValue">childrenPropValueForOption</option>
            </select>
          </div>
        )
      })

      it('should raise an error describing that two matching React elements were found', () => {
        expect(() => page.select('propValue', 'childrenPropValueForOption')).toThrowError(
          Error,
          '.select(\'propValue\', \'childrenPropValueForOption\') failed because 2 matching React elements were found by .findWrapperForSelect(\'propValue\', \'childrenPropValueForOption\')'
        )
      })
    })
  })

  describe('propToCheck option specified with className', () => {
    describe('select whose className prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <SelectsCustom
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
          />
        )
      })

      it('should not raise an error describing that no matching React elements were found', () => {
        expect(() => page.select('propValue', 'childrenPropValueForOption', { propToCheck: 'className' })).not.toThrow()
      })
    })
  })
})
