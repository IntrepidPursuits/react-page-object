import React from 'react'
import Page from '../index'
import { BrowserRouter, Link, Route } from 'react-router-dom'

describe('currentPathSpec', () => {
  let page
  const PageOne = () => <h1>Page One</h1>
  const PageTwo = () => <h1>Page Two</h1>
  const TestComponent = () => (
    <BrowserRouter>
      <div>
        <Link to="/two">Go To Page Two</Link>
        <Route exact path="/" component={PageOne} />
        <Route path="/two" component={PageTwo} />
      </div>
    </BrowserRouter>
  )

  describe('initial path is not specified', () => {
    beforeEach(() => {
      page = new Page(<TestComponent />)
    })

    afterEach(() => {
      page.destroy()
    })

    it('should return the root path', () => {
      expect(page.currentPath()).toEqual('/')
    })
  })

  describe('initial path is specified path', () => {
    beforeEach(() => {
      page = new Page(<TestComponent />, { initialPath: '/two' })
    })

    afterEach(() => {
      page.destroy()
    })

    it('should return the specified path', () => {
      expect(page.currentPath()).toEqual('/two')
    })
  })

  describe('path is changed by clicking on a React Router link', () => {
    beforeEach(() => {
      page = new Page(<TestComponent />)
    })

    afterEach(() => {
      page.destroy()
    })

    it('should return the path that the link goes to', () => {
      page.clickLink('Go To Page Two')
      expect(page.currentPath()).toEqual('/two')
    })
  })
})
