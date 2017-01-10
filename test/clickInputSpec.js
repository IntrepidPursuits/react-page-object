import React from 'react'
import Page from 'react-page-object'

describe('clickInputSpec', () => {
  let onBlur, onClick, onFocus, page
  const InputsId = ({ onBlur, onClick, onFocus, onSubmit }) => (
    <form onSubmit={onSubmit}>
      <input type="submit" id="propValue" onBlur={onBlur} onClick={onClick} onFocus={onFocus} />
      <input type="submit" id="secondPropValue" />
    </form>
  )
  const InputsValue = ({ onBlur, onClick, onFocus, onSubmit }) => (
    <form onSubmit={onSubmit}>
      <input type="submit" value="propValue" onBlur={onBlur} onClick={onClick} onFocus={onFocus} />
    </form>
  )
  const InputsCustom = ({ onBlur, onClick, onFocus, onSubmit }) => (
    <form onSubmit={onSubmit}>
      <input type="submit" className="propValue" onBlur={onBlur} onClick={onClick} onFocus={onFocus} />
    </form>
  )

  beforeEach(() => {
    window.onSubmit = event => event.preventDefault()
    window.spyOn(window, 'onSubmit')
    onBlur = window.jasmine.createSpy('onBlur');
    onClick = window.jasmine.createSpy('onClick');
    onFocus = window.jasmine.createSpy('onFocus');
  })

  afterEach(() => {
    page.destroy()
    delete window.onSubmit
  })

  describe('no options given', () => {
    describe('input type submit whose id prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <InputsId
            onBlur={onBlur}
            onClick={onClick}
            onFocus={onFocus}
            onSubmit={window.onSubmit}
          />
        )
      })

      it('should trigger onSubmit event handler', () => {
        page.clickInput('propValue')
        expect(window.onSubmit).toHaveBeenCalled()
      })

      it('should trigger onClick event handler', () => {
        page.clickInput('propValue')
        expect(onClick).toHaveBeenCalled()
      })

      it('should trigger onFocus event handler upon first interaction', () => {
        page.clickInput('propValue')
        page.clickInput('propValue')
        expect(onFocus.calls.count()).toEqual(1)
      })

      it('should trigger onBlur event handler when a new wrapper is focused', () => {
        page.clickInput('propValue')
        page.clickInput('propValue')
        expect(onBlur).not.toHaveBeenCalled()
        page.clickInput('secondPropValue')
        expect(onBlur).toHaveBeenCalled()
      })

      it('should return the page object itself', () => {
        expect(page.clickInput('propValue')).toBe(page)
      })
    })

    describe('input type submit whose value prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <InputsValue
            onBlur={onBlur}
            onClick={onClick}
            onFocus={onFocus}
            onSubmit={window.onSubmit}
          />
        )
      })

      it('should not raise an error describing that no matching React elements were found', () => {
        expect(() => page.clickInput('propValue')).not.toThrow()
      })
    })

    describe('no matching input type submit', () => {
      beforeEach(() => {
        page = new Page(<div></div>)
      })

      it('should raise an error describing that no matching React elements were found', () => {
        expect(() => page.clickInput('propValue')).toThrowError(
          Error,
          '.clickInput(\'propValue\') failed because no matching React elements were found by .findWrapperForClickInput(\'propValue\')'
        )
      })
    })

    describe('two matching input type submit', () => {
      beforeEach(() => {
        page = new Page(
          <div>
            <input type="submit" id="propValue" />
            <input type="submit" id="propValue" />
          </div>
        )
      })

      it('should raise an error describing that two matching React elements were found', () => {
        expect(() => page.clickInput('propValue')).toThrowError(
          Error,
          '.clickInput(\'propValue\') failed because 2 matching React elements were found by .findWrapperForClickInput(\'propValue\')'
        )
      })
    })
  })

  describe('propToCheck option specified with className', () => {
    describe('input type submit whose className prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <InputsCustom
            onBlur={onBlur}
            onClick={onClick}
            onFocus={onFocus}
            onSubmit={window.onSubmit}
          />
        )
      })

      it('should not raise an error describing that no matching React elements were found', () => {
        expect(() => page.clickInput('propValue', { propToCheck: 'className' })).not.toThrow()
      })
    })
  })
})
