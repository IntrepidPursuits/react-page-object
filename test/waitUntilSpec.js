import React, { Component } from 'react'
import Page from 'react-page-object'

describe('waitUntilSpec', () => {
  let page
  class TestComponent extends Component {
    constructor() {
      super()
      this.state = {}
    }

    componentDidMount() {
      new Promise(resolve => setTimeout(resolve, 100))
        .then(() => this.setState({ message: 'hello' }))
    }

    render() {
      return <h1>{this.state.message}</h1>
    }
  }

  beforeEach(() => {
    page = new Page(<TestComponent />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('should call the done function once the page renders the message', done => {
    expect(page.wrapper.html()).toEqual('<h1></h1>')
    page.waitUntil(() => page.wrapper.html() === '<h1>hello</h1>')
      .then(done, error => done.fail(error.message))
  })

  it('should invoke the callback as often as specified in the delay', done => {
    expect(page.wrapper.html()).toEqual('<h1></h1>')
    page.waitUntil(() => page.wrapper.html() === '<h1>hello</h1>', { delay: 80 })
      .then(callbackInvocationCount => {
        expect(callbackInvocationCount).toEqual(2)
      })
      .then(done, error => done.fail(error.message))
  })

  it('should invoke the callback at most 50 times by default', done => {
    page.waitUntil(() => false, { delay: 1 })
      .catch(error => {
        expect(error.message).toEqual('Invoked function () { return false; } every 1 millisecond(s) 50 time(s), but the callback never returned true')
      })
      .then(done, error => done.fail(error.message))
  })

  it('should invoke the callback every 10 ms by default', done => {
    page.waitUntil(() => false, { numberOfTries: 1 })
      .catch(error => {
        expect(error.message).toEqual('Invoked function () { return false; } every 10 millisecond(s) 1 time(s), but the callback never returned true')
      })
      .then(done, error => done.fail(error.message))
  })

  it('should invoke the callback at most as many times as specified by numberOfTries', done => {
    page.waitUntil(() => false, { delay: 1, numberOfTries: 1 })
      .catch(error => {
        expect(error.message).toEqual('Invoked function () { return false; } every 1 millisecond(s) 1 time(s), but the callback never returned true')
      })
      .then(done, error => done.fail(error.message))
  })
})
