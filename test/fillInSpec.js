import React from 'react'
import Page from 'react-page-object'

describe('fillInSpec', () => {
  let onBlur, onChange, onFocus, page
  const InputsId = ({ onBlur, onChange, onFocus }) => (
    <div>
      <input id="propValue" onBlur={onBlur} onChange={onChange} onFocus={onFocus} />
      <input id="secondPropValue" />
    </div>
  )
  const InputsIdTypeText = ({ onBlur, onChange, onFocus }) => (
    <div>
      <input id="propValue" type="text" onBlur={onBlur} onChange={onChange} onFocus={onFocus} />
    </div>
  )
  const InputsIdTypeEmail = ({ onBlur, onChange, onFocus }) => (
    <div>
      <input id="propValue" type="email" onBlur={onBlur} onChange={onChange} onFocus={onFocus} />
    </div>
  )
  const InputsIdTypePassword = ({ onBlur, onChange, onFocus }) => (
    <div>
      <input id="propValue" type="password" onBlur={onBlur} onChange={onChange} onFocus={onFocus} />
    </div>
  )
  const InputsName = ({ onBlur, onChange, onFocus }) => (
    <div>
      <input name="propValue" onBlur={onBlur} onChange={onChange} onFocus={onFocus} />
    </div>
  )
  const InputsPlaceholder = ({ onBlur, onChange, onFocus }) => (
    <div>
      <input placeholder="propValue" onBlur={onBlur} onChange={onChange} onFocus={onFocus} />
    </div>
  )
  const InputsCustom = ({ onBlur, onChange, onFocus }) => (
    <div>
      <input className="propValue" onBlur={onBlur} onChange={onChange} onFocus={onFocus} />
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
    describe('input whose id prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <InputsId
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
          />
        )
      })

      it('should trigger onChange event handler', () => {
        page.fillIn('propValue', 'eventTargetValue')
        expect(onChange).toHaveBeenCalled()
        const event = onChange.calls.first().args[0]
        expect(event.target).toEqual({ value: 'eventTargetValue', name: undefined })
      })

      it('should trigger onFocus event handler upon first interaction', () => {
        page.fillIn('propValue', 'eventTargetValue')
        page.fillIn('propValue', 'eventTargetValue')
        expect(onFocus.calls.count()).toEqual(1)
      })

      it('should trigger onBlur event handler when a new wrapper is focused', () => {
        page.fillIn('propValue', 'eventTargetValue')
        page.fillIn('propValue', 'eventTargetValue')
        expect(onBlur).not.toHaveBeenCalled()
        page.fillIn('secondPropValue', 'eventTargetValue')
        expect(onBlur).toHaveBeenCalled()
      })

      it('should return the page object itself', () => {
        expect(page.fillIn('propValue', 'eventTargetValue')).toBe(page)
      })
    })

    describe('input type text whose id prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <InputsIdTypeText
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
          />
        )
      })

      it('should not raise an error describing that no matching React elements were found', () => {
        expect(() => page.fillIn('propValue', 'eventTargetValue')).not.toThrow()
      })
    })

    describe('input type email whose id prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <InputsIdTypeEmail
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
          />
        )
      })

      it('should not raise an error describing that no matching React elements were found', () => {
        expect(() => page.fillIn('propValue', 'eventTargetValue')).not.toThrow()
      })
    })

    describe('input type password whose id prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <InputsIdTypePassword
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
          />
        )
      })

      it('should not raise an error describing that no matching React elements were found', () => {
        expect(() => page.fillIn('propValue', 'eventTargetValue')).not.toThrow()
      })
    })

    describe('input whose name prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <InputsName
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
          />
        )
      })

      it('should not raise an error describing that no matching React elements were found', () => {
        expect(() => page.fillIn('propValue', 'eventTargetValue')).not.toThrow()
      })
    })

    describe('input whose placeholder prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <InputsPlaceholder
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
          />
        )
      })

      it('should not raise an error describing that no matching React elements were found', () => {
        expect(() => page.fillIn('propValue', 'eventTargetValue')).not.toThrow()
      })
    })

    describe('no matching input', () => {
      beforeEach(() => {
        page = new Page(<div></div>)
      })

      it('should raise an error describing that no matching React elements were found', () => {
        expect(() => page.fillIn('propValue', 'eventTargetValue')).toThrowError(
          Error,
          '.fillIn(\'propValue\', \'eventTargetValue\') failed because no matching React elements were found by .findWrapperForFillIn(\'propValue\')'
        )
      })
    })

    describe('two matching inputs', () => {
      beforeEach(() => {
        page = new Page(
          <div>
            <input id="propValue" />
            <input id="propValue" />
          </div>
        )
      })

      it('should raise an error describing that two matching React elements were found', () => {
        expect(() => page.fillIn('propValue', 'eventTargetValue')).toThrowError(
          Error,
          '.fillIn(\'propValue\', \'eventTargetValue\') failed because 2 matching React elements were found by .findWrapperForFillIn(\'propValue\')'
        )
      })
    })
  })

  describe('propToCheck option specified with className', () => {
    describe('input whose className prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <InputsCustom
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
          />
        )
      })

      it('should not raise an error describing that no matching React elements were found', () => {
        expect(() => page.fillIn('propValue', 'eventTargetValue', { propToCheck: 'className' })).not.toThrow()
      })
    })
  })
})
