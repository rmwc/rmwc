// @flow
import * as PropTypes from 'prop-types';
export { default as classNames } from 'classnames';
export { PropTypes };

export { simpleTag } from './simpleTag';
export type { SimpleTagPropsT } from './simpleTag';

export { withTheme } from './withTheme';
export type { WithThemePropsT } from './withTheme';

export { noop } from './utils/noop';
export { randomId } from './utils/randomId';
export { debounce } from './utils/debounce';

export { withFoundation, syncFoundationProp } from './withFoundation';

export { FoundationComponent } from './foundation-component';
export { Component } from './component';
export type { ComponentPropsT } from './component';

//$FlowFixMe
export type CustomEventT<T> = CustomEvent<T> & SyntheticEvent<EventTarget>;
