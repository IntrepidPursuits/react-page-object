import React, { Component } from 'react'
import Page from 'react-page-object'
import { BrowserRouter, Match } from 'react-router'

describe('constructorSpec', () => {
  let page
  class TestComponent extends Component {
    componentDidMount() { }

    render() {
      return null
    }
  }

  afterEach(() => {
    page.destroy()
  })

  it('should return a Page object', () => {
    page = new Page(<TestComponent />)
    expect(page.constructor.name).toEqual('Page')
  })

  it('should mount the reactElement', () => {
    window.spyOn(TestComponent.prototype, 'componentDidMount')
    page = new Page(<TestComponent />)
    expect(TestComponent.prototype.componentDidMount).toHaveBeenCalled()
  })

  it('should set the initial path to / if not specified', () => {
    page = new Page(<TestComponent />)
    expect(window.location.pathname).toEqual('/')
  })

  it('should set the initial path to the specified path', () => {
    const initialPath = "/movies"
    page = new Page(<TestComponent />, { initialPath })
    expect(window.location.pathname).toEqual(initialPath)
  })

  it('should render components using React Router', () => {
    const PageOne = () => <h1>Page One</h1>
    const TestComponentWithRouter = () => (
      <BrowserRouter>
        <div>
          <Match exactly pattern="/" component={PageOne} />
        </div>
      </BrowserRouter>
    )
    page = new Page(<TestComponentWithRouter />)
    expect(page.wrapper.html()).toEqual('<div><h1>Page One</h1></div>')
  })
})
