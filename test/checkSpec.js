import React from 'react'
import Page from 'react-page-object'

describe('checkSpec', () => {
  let onBlur, onChange, onFocus, page, secondOnChange
  const ChecksId = ({ onBlur, onChange, onFocus, secondOnChange }) => (
    <div>
      <input type="checkbox" id="propValue" onBlur={onBlur} onChange={onChange} onFocus={onFocus} />
      <input type="checkbox" id="secondPropValue" value="customValue" name="customName" onChange={secondOnChange} />
    </div>
  )
  const ChecksName = ({ onBlur, onChange, onFocus }) => (
    <div>
      <input type="checkbox" name="propValue" onBlur={onBlur} onChange={onChange} onFocus={onFocus} />
    </div>
  )
  const ChecksCustom = ({ onBlur, onChange, onFocus }) => (
    <div>
      <input type="checkbox" className="propValue" onBlur={onBlur} onChange={onChange} onFocus={onFocus} />
    </div>
  )

  beforeEach(() => {
    onBlur = window.jasmine.createSpy('onBlur');
    onChange = window.jasmine.createSpy('onChange');
    onFocus = window.jasmine.createSpy('onFocus');
    secondOnChange = window.jasmine.createSpy('secondOnChange');
  })

  afterEach(() => {
    page.destroy()
  })

  describe('no options given', () => {
    describe('input type checkbox whose id prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <ChecksId
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            secondOnChange={secondOnChange}
          />
        )
      })

      describe('input type checkbox with no value prop', () => {
        it('should trigger onChange event handler with an event whose target.value is \'on\'', () => {
          page.check('propValue')
          expect(onChange).toHaveBeenCalled()
          const event = onChange.calls.first().args[0]
          expect(event.target).toEqual({ checked: true, type: 'checkbox', value: 'on', name: undefined })
        })
      })

      describe('input type checkbox with value prop', () => {
        it('should trigger onChange event handler with an event whose target.value equals the input\'s value prop', () => {
          page.check('secondPropValue')
          expect(secondOnChange).toHaveBeenCalled()
          const event = secondOnChange.calls.first().args[0]
          expect(event.target).toEqual({ checked: true, type: 'checkbox', value: 'customValue', name: 'customName' })
        })
      })

      it('should trigger onFocus event handler upon first interaction', () => {
        page.check('propValue')
        page.check('propValue')
        expect(onFocus.calls.count()).toEqual(1)
      })

      it('should trigger onBlur event handler when a new wrapper is focused', () => {
        page.check('propValue')
        page.check('propValue')
        expect(onBlur).not.toHaveBeenCalled()
        page.check('secondPropValue')
        expect(onBlur).toHaveBeenCalled()
      })

      it('should return the page object itself', () => {
        expect(page.check('propValue')).toBe(page)
      })
    })

    describe('input type checkbox whose name prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <ChecksName
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
          />
        )
      })

      it('should not raise an error describing that no matching React elements were found', () => {
        expect(() => page.check('propValue')).not.toThrow()
      })
    })

    describe('no matching input type checkbox', () => {
      beforeEach(() => {
        page = new Page(<div></div>)
      })

      it('should raise an error describing that no matching React elements were found', () => {
        expect(() => page.check('propValue')).toThrowError(
          Error,
          '.check(\'propValue\') failed because no matching React elements were found by .findWrapperForCheck(\'propValue\')'
        )
      })
    })

    describe('two matching input type checkbox', () => {
      beforeEach(() => {
        page = new Page(
          <div>
            <input type="checkbox" id="propValue" />
            <input type="checkbox" id="propValue" />
          </div>
        )
      })

      it('should raise an error describing that two matching React elements were found', () => {
        expect(() => page.check('propValue')).toThrowError(
          Error,
          '.check(\'propValue\') failed because 2 matching React elements were found by .findWrapperForCheck(\'propValue\')'
        )
      })
    })
  })

  describe('propToCheck option specified with className', () => {
    describe('input type checkbox whose className prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <ChecksCustom
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
          />
        )
      })

      it('should not raise an error describing that no matching React elements were found', () => {
        expect(() => page.check('propValue', { propToCheck: 'className' })).not.toThrow()
      })
    })
  })
})
