import React from 'react'
import Page from 'react-page-object'

describe('contentMatchesSpec', () => {
  let page
  const TestComponent = () => (
    <div>
      <h1>Header</h1>
      <p>Text</p>
    </div>
  )

  beforeEach(() => {
    page = new Page(<TestComponent />)
  })

  afterEach(() => {
    page.destroy()
  })

  describe('given a string', () => {
    it('should return true for strings which are a substring of the page text', () => {
      expect(page.contentMatches('Header')).toEqual(true)
    })

    it('should return false for strings which are not a substring of the page text', () => {
      expect(page.contentMatches('this will not match')).toEqual(false)
    })
  })

  describe('given a RegExp', () => {
    it('should return true if the RegExp matches the page text', () => {
      expect(page.contentMatches(/header/i)).toEqual(true)
    })

    it('should return false if the RegExp does not match the page text', () => {
      expect(page.contentMatches(/this will not match/)).toEqual(false)
    })
  })
})
