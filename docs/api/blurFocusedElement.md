### `.blurFocusedElement() => Page`

Blur the focused element.

#### Returns

`Page` object which invoked the method. This allow the method to be chained
with another `Page` object method.

#### Simulated Events

If there is a React element which is focused.

1. Simulates a `blur` event on the focused React element. At this point, there is no
   React element which is currently focused.

If there is no React element which is focused, then nothing occurs.
