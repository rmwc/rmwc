import { WithThemeProps } from './withTheme';
import { FoundationProps } from './foundation-component';
import { FocusTrap } from 'focus-trap';

export type WithThemeProps = WithThemeProps;
export interface FoundationProps extends FoundationProps {}

export { default as classNames } from 'classnames';
export { default as createFocusTrap } from 'focus-trap';
export interface FocusTrap extends FocusTrap {}

export * from './withTheme';
export { FoundationComponent } from './foundation-component';
export { componentFactory } from './component';

export type CustomEventT<T> = CustomEvent<T> &
  React.SyntheticEvent<EventTarget>;

export * from './utils';
