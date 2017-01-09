import React from 'react'
import Page from 'react-page-object'

describe('contentSpec', () => {
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

  it('should return a string containing all the text', () => {
    expect(page.content()).toEqual('HeaderText')
  })
})
