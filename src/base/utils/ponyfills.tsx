export const closest = (
  element: HTMLElement | EventTarget | null,
  selector: string
) => {
  if (element instanceof Element) {
    /* istanbul ignore else  */
    if (element && element.closest) {
      return element.closest(selector);
    } else {
      let el: HTMLElement | null = element;
      while (el) {
        if (matches(el, selector)) {
          return el;
        }
        el = el.parentElement;
      }
    }
  }
  return null;
};

export const matches = (element: HTMLElement, selector: string) => {
  /* istanbul ignore next  */
  const nativeMatches =
    element.matches ||
    element.webkitMatchesSelector ||
    // @ts-ignore
    element.msMatchesSelector;
  return nativeMatches.call(element, selector);
};
