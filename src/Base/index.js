// @flow
export { simpleTag } from './simpleTag';
export type { SimpleTagPropsT } from './simpleTag';

export { withRipple } from './withRipple';
export type { WithRipplePropsT } from './withRipple';

export { withTheme } from './withTheme';
export type { WithThemePropsT } from './withTheme';

export { noop } from './utils/noop';

export { randomId } from './utils/randomId';

export { withFoundation, syncFoundationProp } from './withFoundation';

export type CustomEventT = {
  bubbles: boolean,
  cancelBubble: boolean,
  cancelable: boolean,
  composed: boolean,
  currentTarget: ?window.HTMLElement,
  defaultPrevented: boolean,
  eventPhase: number,
  isTrusted: boolean,
  path: window.HTMLElement[],
  returnValue: boolean,
  srcElement: ?window.HTMLElement,
  target: ?window.HTMLElement,
  timeStamp: number,
  type: string
};
