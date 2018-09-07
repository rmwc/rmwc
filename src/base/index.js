// @flow
export { simpleTag } from './simpleTag';
export type { SimpleTagPropsT } from './simpleTag';

export { withTheme } from './withTheme';
export type { WithThemePropsT } from './withTheme';

export { noop } from './utils/noop';

export { randomId } from './utils/randomId';

export { withFoundation, syncFoundationProp } from './withFoundation';

//$FlowFixMe
export type CustomEventT<T> = CustomEvent<T> & SyntheticEvent<EventTarget>;
