export const closest = (
  element: HTMLElement | EventTarget | null,
  selector: string
) => {
  if (element instanceof Element) {
    if (element && element.closest) {
      return element.closest(selector);
    }

    let el: HTMLElement | null = element;
    while (el) {
      if (matches(el, selector)) {
        return el;
      }
      el = el.parentElement;
    }
  }
  return null;
};

export const matches = (element: HTMLElement, selector: string) => {
  const nativeMatches =
    element.matches ||
    element.webkitMatchesSelector ||
    // @ts-ignore
    element.msMatchesSelector;
  return nativeMatches.call(element, selector);
};
