import React from 'react'
import Page from 'react-page-object'
import { BrowserRouter, Link, Match } from 'react-router'

describe('clickLinkSpec', () => {
  let onBlur, onFocus, page
  const LinksId = ({ onBlur, onClick, onFocus }) => (
    <div>
      <a id="propValue" href="#" onBlur={onBlur} onClick={onClick} onFocus={onFocus} />
      <a id="secondPropValue" href="#" onBlur={onBlur} onClick={onClick} onFocus={onFocus} />
    </div>
  )
  const LinksChildren = ({ onBlur, onClick, onFocus }) => (
    <div>
      <a href="#" onBlur={onBlur} onClick={onClick} onFocus={onFocus}>
        propValue
      </a>
    </div>
  )
  const LinksHref = ({ onBlur, onClick, onFocus }) => (
    <div>
      <a href="/prop-value" onBlur={onBlur} onClick={onClick} onFocus={onFocus} />
    </div>
  )
  const LinksCustom = ({ onBlur, onClick, onFocus }) => (
    <div>
      <a className="propValue" href="#" onBlur={onBlur} onClick={onClick} onFocus={onFocus} />
    </div>
  )
  const LinksReactRouter = ({ onBlur, onFocus }) => (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={() => <Link id="propValueFirst" to="/second" onBlur={onBlur} onFocus={onFocus} />} />
        <Match pattern="/second" component={() => <Link to="/third">propValueSecond</Link>} />
        <Match pattern="/third" component={() => <Link to="/prop-value-third" />} />
        <Match pattern="/prop-value-third" component={() => <Link className="propValueFourth" to="/" />} />
      </div>
    </BrowserRouter>
  )

  beforeEach(() => {
    window.onClick = event => event.preventDefault()
    window.spyOn(window, 'onClick')
    onBlur = window.jasmine.createSpy('onBlur');
    onFocus = window.jasmine.createSpy('onFocus');
  })

  afterEach(() => {
    page.destroy()
    delete window.onClick
  })

  describe('no options given', () => {
    describe('link whose id prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <LinksId
            onBlur={onBlur}
            onClick={window.onClick}
            onFocus={onFocus}
          />
        )
      })

      it('should trigger onClick event handler', () => {
        page.clickLink('propValue')
        expect(window.onClick).toHaveBeenCalled()
      })

      it('should trigger onFocus event handler upon first interaction', () => {
        page.clickLink('propValue')
        page.clickLink('propValue')
        expect(onFocus.calls.count()).toEqual(1)
      })

      it('should trigger onBlur event handler when a new wrapper is focused', () => {
        page.clickLink('propValue')
        page.clickLink('propValue')
        expect(onBlur).not.toHaveBeenCalled()
        page.clickLink('secondPropValue')
        expect(onBlur).toHaveBeenCalled()
      })

      it('should return the page object itself', () => {
        expect(page.clickLink('propValue')).toBe(page)
      })
    })

    describe('link whose children prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <LinksChildren
            onBlur={onBlur}
            onClick={window.onClick}
            onFocus={onFocus}
          />
        )
      })

      it('should not raise an error describing that no matching React elements were found', () => {
        expect(() => page.clickLink('propValue')).not.toThrow()
      })
    })

    describe('link whose href prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <LinksHref
            onBlur={onBlur}
            onClick={window.onClick}
            onFocus={onFocus}
          />
        )
      })

      it('should not raise an error describing that no matching React elements were found', () => {
        expect(() => page.clickLink('/prop-value')).not.toThrow()
      })
    })

    describe('ReactRouter Links', () => {
      beforeEach(() => {
        page = new Page(
          <LinksReactRouter
            onBlur={onBlur}
            onFocus={onFocus}
          />
        )
      })

      it('should trigger ReactRouter navigation', () => {
        page.clickLink('propValueFirst')
        page.clickLink('propValueSecond')
        page.clickLink('/prop-value-third')
        page.clickLink('propValueFourth', { propToCheck: 'className' })
        expect(window.location.pathname).toEqual('/')
      })
    })

    describe('no matching link', () => {
      beforeEach(() => {
        page = new Page(<div></div>)
      })

      it('should raise an error describing that no matching React elements were found', () => {
        expect(() => page.clickLink('propValue')).toThrowError(
          Error,
          '.clickLink(\'propValue\') failed because no matching React elements were found by .findWrapperForClickLink(\'propValue\')'
        )
      })
    })

    describe('two matching links', () => {
      beforeEach(() => {
        page = new Page(
          <div>
            <a id="propValue" />
            <a id="propValue" />
          </div>
        )
      })

      it('should raise an error describing that two matching React elements were found', () => {
        expect(() => page.clickLink('propValue')).toThrowError(
          Error,
          '.clickLink(\'propValue\') failed because 2 matching React elements were found by .findWrapperForClickLink(\'propValue\')'
        )
      })
    })
  })

  describe('propToCheck option specified with className', () => {
    describe('link whose className prop value matches the propValue', () => {
      beforeEach(() => {
        page = new Page(
          <LinksCustom
            onBlur={onBlur}
            onClick={window.onClick}
            onFocus={onFocus}
          />
        )
      })

      it('should not raise an error describing that no matching React elements were found', () => {
        expect(() => page.clickLink('propValue', { propToCheck: 'className' })).not.toThrow()
      })
    })
  })
})
