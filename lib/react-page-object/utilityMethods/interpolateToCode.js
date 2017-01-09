const interpolatedHTML = body => (
  `<!DOCTYPE html><html><head><meta charset="utf-8"><title>React Page Object Preview</title></head><body>${body}</body></html>`
).replace(/`/g, '\\`')

export default function interpolateToCode(body) {
  return `PASTE THE FOLLOWING INTO YOUR BROWSER CONSOLE:\nwindow.open().document.write(\`${interpolatedHTML(body)}\`)\n`
}
