import React from 'react'
import Page from 'react-page-object'

describe('blurFocusedElementSpec', () => {
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
      page.focusedWrapper = fakeWrapper
    })

    it('should simulate a \'blur\' event on the previously focused wrapper', () => {
      window.spyOn(fakeWrapper, 'simulate')
      page.blurFocusedElement()
      expect(fakeWrapper.simulate).toHaveBeenCalledWith('blur')
    })

    it('should set focusedWrapper to null', () => {
      page.blurFocusedElement()
      expect(page.focusedWrapper).toEqual(null)
    })

    it('should return the page object itself', () => {
      expect(page.blurFocusedElement()).toBe(page)
    })
  })

  describe('there is no previously focused wrapper', () => {
    it('should not throw an error if method is invoked', () => {
      expect(() => page.blurFocusedElement()).not.toThrow()
    })
  })
})
