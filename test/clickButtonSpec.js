import React from 'react'
import Page from 'react-page-object'

describe('clickButtonSpec', () => {
  let onBlur, onClick, onFocus, page
  const ButtonsId = ({ onBlur, onClick, onFocus, onSubmit }) => (
    <form onSubmit={onSubmit}>
      <button id="propValue" onBlur={onBlur} onClick={onClick} onFocus={onFocus} />
      <button id="secondPropValue" />
    </form>
  )
  const ButtonsChildren = ({ onBlur, onClick, onFocus, onSubmit }) => (
    <form onSubmit={onSubmit}>
      <button onBlur={onBlur} onClick={onClick} onFocus={onFocus}>propValue</button>
    </form>
  )
  const ButtonsCustom = ({ onBlur, onClick, onFocus, onSubmit }) => (
    <form onSubmit={onSubmit}>
      <button className="propValue" onBlur={onBlur} onClick={onClick} onFocus={onFocus} />
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
    describe('button whose id prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <ButtonsId
            onBlur={onBlur}
            onClick={onClick}
            onFocus={onFocus}
            onSubmit={window.onSubmit}
          />
        )
      })

      it('should trigger onSubmit event handler', () => {
        page.clickButton('propValue')
        expect(window.onSubmit).toHaveBeenCalled()
      })

      it('should trigger onClick event handler', () => {
        page.clickButton('propValue')
        expect(onClick).toHaveBeenCalled()
      })

      it('should trigger onFocus event handler upon first interaction', () => {
        page.clickButton('propValue')
        page.clickButton('propValue')
        expect(onFocus.calls.count()).toEqual(1)
      })

      it('should trigger onBlur event handler when a new wrapper is focused', () => {
        page.clickButton('propValue')
        page.clickButton('propValue')
        expect(onBlur).not.toHaveBeenCalled()
        page.clickButton('secondPropValue')
        expect(onBlur).toHaveBeenCalled()
      })

      it('should return the page object itself', () => {
        expect(page.clickButton('propValue')).toBe(page)
      })
    })

    describe('button whose children prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <ButtonsChildren
            onBlur={onBlur}
            onClick={onClick}
            onFocus={onFocus}
            onSubmit={window.onSubmit}
          />
        )
      })

      it('should not raise an error describing that no matching React elements were found', () => {
        expect(() => page.clickButton('propValue')).not.toThrow()
      })
    })

    describe('no matching button', () => {
      beforeEach(() => {
        page = new Page(<div></div>)
      })

      it('should raise an error describing that no matching React elements were found', () => {
        expect(() => page.clickButton('propValue')).toThrowError(
          Error,
          '.clickButton(\'propValue\') failed because no matching React elements were found by .findWrapperForClickButton(\'propValue\')'
        )
      })
    })

    describe('two matching button', () => {
      beforeEach(() => {
        page = new Page(
          <div>
            <button type="submit" id="propValue" />
            <button type="submit" id="propValue" />
          </div>
        )
      })

      it('should raise an error describing that two matching React elements were found', () => {
        expect(() => page.clickButton('propValue')).toThrowError(
          Error,
          '.clickButton(\'propValue\') failed because 2 matching React elements were found by .findWrapperForClickButton(\'propValue\')'
        )
      })
    })
  })

  describe('propToCheck option specified with className', () => {
    describe('button whose className prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <ButtonsCustom
            onBlur={onBlur}
            onClick={onClick}
            onFocus={onFocus}
            onSubmit={window.onSubmit}
          />
        )
      })

      it('should not raise an error describing that no matching React elements were found', () => {
        expect(() => page.clickButton('propValue', { propToCheck: 'className' })).not.toThrow()
      })
    })
  })
})
