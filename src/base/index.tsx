import { WithThemeProps as _WithThemeProps } from './with-theme';

export const RMWC_VERSION = process.env.RMWC_VERSION || 'rmwc_version';
//@ts-ignore
export { default as classNames } from 'classnames';
export * from './with-theme';
export * from './utils';
export * from './foundation-component';
export * from './component';
export * from './portal';
export * from './PortalContext';

export type WithThemeProps = _WithThemeProps;
