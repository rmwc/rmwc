import { FocusTrap, FocusOptions } from '@material/dom/focus-trap';

export { FocusTrap } from '@material/dom/focus-trap';

export const focusTrapFactory = (
  el: HTMLElement,
  focusOptions?: FocusOptions
) => new FocusTrap(el, focusOptions);
