import { toDashCase } from '../Base/utils/to-dash-case';

export const themeOptionsCamel = [
  'primary',
  'secondary',
  'background',
  'surface',
  'onPrimary',
  'onSecondary',
  'onSurface',
  'textPrimaryOnBackground',
  'textSecondaryOnBackground',
  'textHintOnBackground',
  'textDisabledOnBackground',
  'textIconOnBackground',
  'textPrimaryOnLight',
  'textSecondaryOnLight',
  'textHintOnLight',
  'textDisabledOnLight',
  'textIconOnLight',
  'textPrimaryOnDark',
  'textSecondaryOnDark',
  'textHintOnDark',
  'textDisabledOnDark',
  'textIconOnDark'
];

export const themeOptions = themeOptionsCamel.map(toDashCase);

export default themeOptions;
