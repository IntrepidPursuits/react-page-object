export default function focusAndBlurWrappersIfNecessary(page, wrapper) {
  const shouldFocusWrapper = !page.previouslyFocusedWrapper ||
  (page.previouslyFocusedWrapper.getNode() !== wrapper.getNode())

  if (shouldFocusWrapper) {
    if (page.previouslyFocusedWrapper) {
      page.previouslyFocusedWrapper.simulate('blur')
    }

    wrapper.simulate('focus')
    page.previouslyFocusedWrapper = wrapper
  }
}
