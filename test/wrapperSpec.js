import React from 'react'
import Page from 'react-page-object'

describe('wrapperSpec', () => {
  let page
  const TestComponent = ({ id }) => <h1 id={id}>I am Component</h1>

  beforeEach(() => {
    page = new Page(<TestComponent id="value-from-prop" />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('should return an enzyme ReactWrapper', () => {
    expect(page.wrapper.constructor.name).toEqual('ReactWrapper')
  })

  it('should return an enzyme ReactWrapper representing the passed in reactElement', () => {
    expect(page.wrapper.html()).toEqual('<h1 id="value-from-prop">I am Component</h1>')
  })
})
