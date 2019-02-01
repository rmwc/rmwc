import { WithThemeProps as _WithThemeProps } from './withTheme';
import { FoundationProps as _FoundationProps } from './foundation-component';
import { FocusTrap as _FocusTrap } from 'focus-trap';

export type WithThemeProps = _WithThemeProps;
export interface FoundationProps extends _FoundationProps {}

export { default as classNames } from 'classnames';
export { default as createFocusTrap } from 'focus-trap';
export interface FocusTrap extends _FocusTrap {}

export * from './withTheme';
export { FoundationComponent } from './foundation-component';
export { componentFactory } from './component';

export * from './utils';
