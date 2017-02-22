import React from 'react'
import Page from 'react-page-object'

describe('fillInTextareaSpec', () => {
  let onBlur, onChange, onFocus, page
  const TextareasId = ({ onBlur, onChange, onFocus }) => (
    <div>
      <textarea id="propValue" onBlur={onBlur} onChange={onChange} onFocus={onFocus} />
      <textarea id="secondPropValue" />
    </div>
  )
  const TextareasName = ({ onBlur, onChange, onFocus }) => (
    <div>
      <textarea name="propValue" onBlur={onBlur} onChange={onChange} onFocus={onFocus} />
    </div>
  )
  const TextareasPlaceholder = ({ onBlur, onChange, onFocus }) => (
    <div>
      <textarea placeholder="propValue" onBlur={onBlur} onChange={onChange} onFocus={onFocus} />
    </div>
  )
  const TextareasCustom = ({ onBlur, onChange, onFocus }) => (
    <div>
      <textarea className="propValue" onBlur={onBlur} onChange={onChange} onFocus={onFocus} />
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
    describe('textarea whose id prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <TextareasId
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
          />
        )
      })

      it('should trigger onChange event handler', () => {
        page.fillInTextarea('propValue', 'eventTargetValue')
        expect(onChange).toHaveBeenCalled()
        const event = onChange.calls.first().args[0]
        expect(event.target).toEqual({ value: 'eventTargetValue', name: undefined })
      })

      it('should trigger onFocus event handler upon first interaction', () => {
        page.fillInTextarea('propValue', 'eventTargetValue')
        page.fillInTextarea('propValue', 'eventTargetValue')
        expect(onFocus.calls.count()).toEqual(1)
      })

      it('should trigger onBlur event handler when a new wrapper is focused', () => {
        page.fillInTextarea('propValue', 'eventTargetValue')
        page.fillInTextarea('propValue', 'eventTargetValue')
        expect(onBlur).not.toHaveBeenCalled()
        page.fillInTextarea('secondPropValue', 'eventTargetValue')
        expect(onBlur).toHaveBeenCalled()
      })

      it('should return the page object itself', () => {
        expect(page.fillInTextarea('propValue', 'eventTargetValue')).toBe(page)
      })
    })

    describe('textarea whose name prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <TextareasName
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
          />
        )
      })

      it('should not raise an error describing that no matching React elements were found', () => {
        expect(() => page.fillInTextarea('propValue', 'eventTargetValue')).not.toThrow()
      })
    })

    describe('textarea whose placeholder prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <TextareasPlaceholder
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
          />
        )
      })

      it('should not raise an error describing that no matching React elements were found', () => {
        expect(() => page.fillInTextarea('propValue', 'eventTargetValue')).not.toThrow()
      })
    })

    describe('no matching textarea', () => {
      beforeEach(() => {
        page = new Page(<div></div>)
      })

      it('should raise an error describing that no matching React elements were found', () => {
        expect(() => page.fillInTextarea('propValue', 'eventTargetValue')).toThrowError(
          Error,
          '.fillInTextarea(\'propValue\', \'eventTargetValue\') failed because no matching React elements were found by .findWrapperForFillInTextarea(\'propValue\')'
        )
      })
    })

    describe('two matching textareas', () => {
      beforeEach(() => {
        page = new Page(
          <div>
            <textarea id="propValue" />
            <textarea id="propValue" />
          </div>
        )
      })

      it('should raise an error describing that two matching React elements were found', () => {
        expect(() => page.fillInTextarea('propValue', 'eventTargetValue')).toThrowError(
          Error,
          '.fillInTextarea(\'propValue\', \'eventTargetValue\') failed because 2 matching React elements were found by .findWrapperForFillInTextarea(\'propValue\')'
        )
      })
    })
  })

  describe('propToCheck option specified with className', () => {
    describe('textarea whose className prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <TextareasCustom
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
          />
        )
      })

      it('should not raise an error describing that no matching React elements were found', () => {
        expect(() => page.fillInTextarea('propValue', 'eventTargetValue', { propToCheck: 'className' })).not.toThrow()
      })
    })
  })
})
