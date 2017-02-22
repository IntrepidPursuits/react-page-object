import React from 'react'
import Page from 'react-page-object'

describe('chooseSpec', () => {
  let onBlur, onChange, onFocus, page, secondOnChange
  const RadioButtonsId = ({ onBlur, onChange, onFocus, secondOnChange }) => (
    <div>
      <input type="radio" id="propValue" onBlur={onBlur} onChange={onChange} onFocus={onFocus} />
      <input type="radio" id="secondPropValue" value="customValue" name="customName" onChange={secondOnChange} />
    </div>
  )
  const RadioButtonsName = ({ onBlur, onChange, onFocus }) => (
    <div>
      <input type="radio" name="propValue" onBlur={onBlur} onChange={onChange} onFocus={onFocus} />
    </div>
  )
  const RadioButtonsCustom = ({ onBlur, onChange, onFocus }) => (
    <div>
      <input type="radio" className="propValue" onBlur={onBlur} onChange={onChange} onFocus={onFocus} />
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
    describe('input type radio whose id prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <RadioButtonsId
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            secondOnChange={secondOnChange}
          />
        )
      })

      describe('input type radio with no value prop', () => {
        it('should trigger onChange event handler with an event whose target.value is \'on\'', () => {
          page.choose('propValue')
          expect(onChange).toHaveBeenCalled()
          const event = onChange.calls.first().args[0]
          expect(event.target).toEqual({ checked: true, type: 'radio', value: 'on', name: undefined })
        })
      })

      describe('input type radio with value prop', () => {
        it('should trigger onChange event handler with an event whose target.value equals the input\'s value prop', () => {
          page.choose('secondPropValue')
          expect(secondOnChange).toHaveBeenCalled()
          const event = secondOnChange.calls.first().args[0]
          expect(event.target).toEqual({ checked: true, type: 'radio', value: 'customValue', name: 'customName' })
        })
      })

      it('should trigger onFocus event handler upon first interaction', () => {
        page.choose('propValue')
        page.choose('propValue')
        expect(onFocus.calls.count()).toEqual(1)
      })

      it('should trigger onBlur event handler when a new wrapper is focused', () => {
        page.choose('propValue')
        page.choose('propValue')
        expect(onBlur).not.toHaveBeenCalled()
        page.choose('secondPropValue')
        expect(onBlur).toHaveBeenCalled()
      })

      it('should return the page object itself', () => {
        expect(page.choose('propValue')).toBe(page)
      })
    })

    describe('input type radio whose name prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <RadioButtonsName
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
          />
        )
      })

      it('should not raise an error describing that no matching React elements were found', () => {
        expect(() => page.choose('propValue')).not.toThrow()
      })
    })

    describe('no matching input type radio', () => {
      beforeEach(() => {
        page = new Page(<div></div>)
      })

      it('should raise an error describing that no matching React elements were found', () => {
        expect(() => page.choose('propValue')).toThrowError(
          Error,
          '.choose(\'propValue\') failed because no matching React elements were found by .findWrapperForChoose(\'propValue\')'
        )
      })
    })

    describe('two matching input type radio', () => {
      beforeEach(() => {
        page = new Page(
          <div>
            <input type="radio" id="propValue" />
            <input type="radio" id="propValue" />
          </div>
        )
      })

      it('should raise an error describing that two matching React elements were found', () => {
        expect(() => page.choose('propValue')).toThrowError(
          Error,
          '.choose(\'propValue\') failed because 2 matching React elements were found by .findWrapperForChoose(\'propValue\')'
        )
      })
    })
  })

  describe('propToRadioButton option specified with className', () => {
    describe('input type radio whose className prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <RadioButtonsCustom
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
          />
        )
      })

      it('should not raise an error describing that no matching React elements were found', () => {
        expect(() => page.choose('propValue', { propToCheck: 'className' })).not.toThrow()
      })
    })
  })
})
