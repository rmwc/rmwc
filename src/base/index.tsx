import { WithThemeProps, ThemeOptionT } from './withTheme';
import { ComponentProps } from './component';
import { FocusTrap } from 'focus-trap';

export type WithThemeProps = WithThemeProps;
export type ThemeOptionT = ThemeOptionT;
export interface ComponentProps<T = any> extends ComponentProps<T> {}

export { default as classNames } from 'classnames';
export { default as createFocusTrap } from 'focus-trap';
export interface FocusTrap extends FocusTrap {}

export { withTheme } from './withTheme';
export { FoundationComponent } from './foundation-component';
export { componentFactory } from './component';

export type CustomEventT<T> = CustomEvent<T> &
  React.SyntheticEvent<EventTarget>;
