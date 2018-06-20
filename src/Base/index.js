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
  currentTarget: HTMLElement | null,
  defaultPrevented: boolean,
  eventPhase: number,
  isTrusted: boolean,
  path: HTMLElement[],
  returnValue: boolean,
  srcElement: HTMLElement | null,
  target: HTMLElement | null,
  timeStamp: number,
  type: string
};
