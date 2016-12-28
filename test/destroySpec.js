import React, { Component } from 'react'
import Page from 'react-page-object'

describe('destroySpec', () => {
  let page
  class TestComponent extends Component {
    componentWillUnmount() { }

    render() {
      return null
    }
  }

  beforeEach(() => {
    page = new Page(<TestComponent />, { initialPath: '/movies' })
  })

  it('should unmount the reactElement', () => {
    window.spyOn(TestComponent.prototype, 'componentWillUnmount')
    page.destroy()
    expect(TestComponent.prototype.componentWillUnmount).toHaveBeenCalled()
  })

  it('should set the browser\'s path to the root path', () => {
    page.destroy()
    expect(window.location.pathname).toEqual('/')
  })
})
