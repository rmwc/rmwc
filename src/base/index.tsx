import { WithThemePropsT } from './withTheme';
import { ComponentPropsT } from './class-component';
import { ComponentProps } from './component';

export type WithThemePropsT = WithThemePropsT;
export type ComponentPropsT<P> = ComponentPropsT<P>;
export interface ComponentProps<T = any> extends ComponentProps<T> {}

import * as PropTypes from 'prop-types';
export { default as classNames } from 'classnames';
export { PropTypes };

export { withTheme } from './withTheme';

export { noop } from './utils/noop';
export { randomId } from './utils/randomId';
export { debounce } from './utils/debounce';

export { withFoundation, syncFoundationProp } from './withFoundation';

export { FoundationComponent } from './foundation-component';
export { Component } from './class-component';
export { componentFactory } from './component';

export type CustomEventT<T> = CustomEvent<T> &
  React.SyntheticEvent<EventTarget>;
