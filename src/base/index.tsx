import { WithThemeProps as _WithThemeProps } from './with-theme';
import { FocusTrap as _FocusTrap } from 'focus-trap';
import _createFocusTrap from 'focus-trap';

export { default as classNames } from 'classnames';
export * from './with-theme';
export * from './utils';
export * from './foundation-component';
export * from './component';

export const createFocusTrap = _createFocusTrap;

export type WithThemeProps = _WithThemeProps;
export interface FocusTrap extends _FocusTrap {}
