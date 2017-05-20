# Set up with Jest in [Create React App](https://github.com/facebookincubator/create-react-app)

**This guide will use specific versions NPM packages. Please double-check that you installed the same versions to avoid installation issues!**

1. Install [Create React App](https://github.com/facebookincubator/create-react-app)

  ```
  $ npm install -g create-react-app@1.3.1
  ```

2. Create a new React application

  ```
  $ create-react-app my-app
  $ cd my-app
  ```

3. Install `react-page-object`, `enzyme`, and `react-test-renderer`

  ```
  $ npm i -D react-page-object enzyme@2.8.2 react-test-renderer@15.5.4
  ```

4. Modify the contents of `src/App.test.js` to be:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Page from 'react-page-object';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('Passing test', () => {
  let page;

  beforeEach(() => {
    page = new Page(<App />)
  });

  afterEach(() => {
    page.destroy();
  });

  it('should pass', () => {
    expect(page.content()).toMatch(/Welcome to React/)
  });
})
```

At this point, the set up is complete! You can run Jest as before with:

```
$ npm test
```
