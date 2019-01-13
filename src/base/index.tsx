import { SimpleTagPropsT } from './simpleTag';
import { WithThemePropsT } from './withTheme';
import { ComponentPropsT } from './component';

export type SimpleTagPropsT = SimpleTagPropsT;
export type WithThemePropsT = WithThemePropsT;
export type ComponentPropsT<P> = ComponentPropsT<P>;

import * as PropTypes from 'prop-types';
export { default as classNames } from 'classnames';
export { PropTypes };

export { simpleTag } from './simpleTag';
export { withTheme } from './withTheme';

export { noop } from './utils/noop';
export { randomId } from './utils/randomId';
export { debounce } from './utils/debounce';

export { withFoundation, syncFoundationProp } from './withFoundation';

export { FoundationComponent } from './foundation-component';
export { Component } from './component';

export type CustomEventT<T> = CustomEvent<T> &
  React.SyntheticEvent<EventTarget>;
