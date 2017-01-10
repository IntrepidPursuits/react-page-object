import React from 'react'
import Page from 'react-page-object'

describe('blurLastTouchedElementSpec', () => {
  let page

  beforeEach(() => {
    page = new Page(<div />)
  })

  afterEach(() => {
    page.destroy()
  })

  describe('there is a previously focused wrapper', () => {
    let fakeWrapper

    beforeEach(() => {
      fakeWrapper = { simulate: () => {} }
      page.previouslyFocusedWrapper = fakeWrapper
    })

    it('should simulate a \'blur\' event on the previously focused wrapper', () => {
      window.spyOn(fakeWrapper, 'simulate')
      page.blurLastTouchedElement()
      expect(fakeWrapper.simulate).toHaveBeenCalledWith('blur')
    })

    it('should set previouslyFocusedWrapper to null', () => {
      page.blurLastTouchedElement()
      expect(page.previouslyFocusedWrapper).toEqual(null)
    })

    it('should return the page object itself', () => {
      expect(page.blurLastTouchedElement()).toBe(page)
    })
  })

  describe('there is no previously focused wrapper', () => {
    it('should not throw an error if method is invoked', () => {
      expect(() => page.blurLastTouchedElement()).not.toThrow()
    })
  })
})
