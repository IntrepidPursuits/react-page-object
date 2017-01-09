import React from 'react'
import Page from 'react-page-object'

describe('outputOpenPageCodeSpec', () => {
  let page
  const TestComponent = () => <h1>I am Component</h1>

  beforeEach(() => {
    page = new Page(<TestComponent />)
  })

  afterEach(() => {
    page.destroy()
  })

  it('should output code to open the page in a browser', () => {
    window.spyOn(console, 'log')
    page.outputOpenPageCode()
    expect(console.log).toHaveBeenCalledWith(`PASTE THE FOLLOWING INTO YOUR BROWSER CONSOLE:\nwindow.open().document.write(\`<!DOCTYPE html><html><head><meta charset="utf-8"><title>React Page Object Preview</title></head><body><h1>I am Component</h1></body></html>\`)\n`)
  })
})
