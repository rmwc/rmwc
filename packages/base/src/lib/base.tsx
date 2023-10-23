import packageJson from '../../package.json';
import { WithThemeProps as _WithThemeProps } from './with-theme';
export const RMWC_VERSION = packageJson.version || 'rmwc_version';

export { default as classNames } from 'classnames';
export * from './PortalContext';
export * from './component';
export * from './foundation-component';
export * from './portal';
export * from './utils';
export * from './with-theme';

export type WithThemeProps = _WithThemeProps;
