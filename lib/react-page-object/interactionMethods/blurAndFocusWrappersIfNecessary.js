export default function blurAndFocusWrappersIfNecessary(page, wrapper) {
  const shouldFocusWrapper = !page.focusedWrapper ||
  (page.focusedWrapper.getNode() !== wrapper.getNode())

  if (shouldFocusWrapper) {
    if (page.focusedWrapper) {
      page.focusedWrapper.simulate('blur')
    }

    wrapper.simulate('focus')
    page.focusedWrapper = wrapper
  }
}
