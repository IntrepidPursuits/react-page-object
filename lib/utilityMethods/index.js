import interpolateToCode from './interpolateToCode'

export function content() {
  return this.wrapper.text()
}

export function contentMatches(matcher) {
  const regularExpression = matcher.constructor.name === 'RegExp' ?
    matcher :
    new RegExp(matcher)

  return regularExpression.test(this.wrapper.text())
}

export function currentPath() {
  return window.location.pathname
}


export function outputOpenPageCode() {
  const message = interpolateToCode(this.wrapper.html())
  console.log(message)
}

const formatCallbackOutput = callback => callback.toString().replace(/\s*\n\s*/g, ' ')

function waitUntil(callback, { delay = waitUntil.defaultDelay, numberOfTries = waitUntil.numberOfTries } = {}) {
  return new Promise((resolve, reject) => {
    let intervalId,
        callbackInvocationCount = 0

    intervalId = setInterval(() => {
      callbackInvocationCount += 1

      if (callback()) {
        clearInterval(intervalId)
        resolve(callbackInvocationCount)
      } else {
        if (callbackInvocationCount === numberOfTries) {
          const message = `Invoked ${formatCallbackOutput(callback)} every ${delay} millisecond(s) ${numberOfTries} time(s), but the callback never returned true`
          reject(new Error(message))
        }
      }
    }, delay)
  })
}

waitUntil.defaultDelay = 10
waitUntil.numberOfTries = 50

export { waitUntil }
