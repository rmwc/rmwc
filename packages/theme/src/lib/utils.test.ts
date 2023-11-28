import {
  contrast,
  getAutoColorsForTheme,
  getRgb,
  hexToRgb,
  isDark,
  luminance,
  nameToHex
} from './utils';

const DEFAULT_THEME = {
  '--mdc-theme-primary': '#6200ee',
  '--mdc-theme-secondary': '#03dac4',
  '--mdc-theme-background': '#fff',
  '--mdc-theme-surface': '#fff',
  '--mdc-theme-error': '#b00020'
};

describe('nameToHex', () => {
  it('should convert color names to hex codes', () => {
    expect(nameToHex('aliceblue')).toBe('#f0f8ff');
    expect(nameToHex('red')).toBe('#ff0000');
    expect(nameToHex('unknownColor')).toBe('unknownColor');
  });
});

describe('hexToRgb', () => {
  it('should convert hex codes to RGB colors', () => {
    const rgb = hexToRgb('#f0f8ff');
    expect(rgb.r).toBe(240);
    expect(rgb.g).toBe(248);
    expect(rgb.b).toBe(255);

    const rgbShortHex = hexToRgb('#fff');
    expect(rgbShortHex.r).toBe(255);
    expect(rgbShortHex.g).toBe(255);
    expect(rgbShortHex.b).toBe(255);

    const invalidHex = hexToRgb('#zzzzzz');
    expect(invalidHex.r).toBe(0);
    expect(invalidHex.g).toBe(0);
    expect(invalidHex.b).toBe(0);
  });
});

describe('luminance', () => {
  it('should calculate the luminance of an RGB color', () => {
    const luminanceValue = luminance(255, 255, 255);
    expect(luminanceValue).toBeCloseTo(1);

    const luminanceValueDark = luminance(0, 0, 0);
    expect(luminanceValueDark).toBeCloseTo(0);
  });
});

describe('contrast', () => {
  it('should calculate the contrast ratio between two RGB colors', () => {
    const contrastRatio = contrast([255, 255, 255], [0, 0, 0]);
    expect(contrastRatio).toBeCloseTo(21.21);

    const contrastRatioDark = contrast([0, 0, 0], [255, 255, 255]);
    expect(contrastRatioDark).toBeCloseTo(0.047);
  });
});

describe('getRgb', () => {
  it('should get the RGB color for a given color name or hex code', () => {
    const rgbFromName = getRgb('aliceblue');
    expect(rgbFromName.r).toBe(240);
    expect(rgbFromName.g).toBe(248);
    expect(rgbFromName.b).toBe(255);

    const rgbFromHex = getRgb('#f0f8ff');
    expect(rgbFromHex.r).toBe(240);
    expect(rgbFromHex.g).toBe(248);
    expect(rgbFromHex.b).toBe(255);
  });
});

describe('isDark', () => {
  it('should determine whether a color is dark or not', () => {
    expect(isDark('#ffffff')).toBe(false);
    expect(isDark('#000000')).toBe(true);
    expect(isDark('#808080')).toBe(true);
  });
});

describe('getAutoColorsForTheme', () => {
  it('should return correct colors for theme', () => {
    expect(getAutoColorsForTheme(DEFAULT_THEME)).toStrictEqual({
      '--mdc-theme-background': '#fff',
      '--mdc-theme-error': '#b00020',
      '--mdc-theme-on-primary': 'rgba(255, 255, 255, 1)',
      '--mdc-theme-on-secondary': 'rgba(0, 0, 0, 0.87)',
      '--mdc-theme-on-surface': 'rgba(0, 0, 0, 0.87)',
      '--mdc-theme-primary': '#6200ee',
      '--mdc-theme-secondary': '#03dac4',
      '--mdc-theme-surface': '#fff',
      '--mdc-theme-text-disabled-on-background': 'rgba(0, 0, 0, 0.38)',
      '--mdc-theme-text-hint-on-background': 'rgba(0, 0, 0, 0.38)',
      '--mdc-theme-text-icon-on-background': 'rgba(0, 0, 0, 0.38)',
      '--mdc-theme-text-primary-on-background': 'rgba(0, 0, 0, 0.87)',
      '--mdc-theme-text-secondary-on-background': 'rgba(0, 0, 0, 0.54)'
    });
  });

  it('should return the correct autoColors for a dark theme', () => {
    const colors = {
      '--mdc-theme-primary': '#000000',
      '--mdc-theme-surface': '#222222',
      '--mdc-theme-secondary': '#444444',
      '--mdc-theme-background': '#ffffff'
    };

    const autoColors = getAutoColorsForTheme(colors);

    expect(autoColors['--mdc-theme-text-primary-on-background']).toBe(
      'rgba(0, 0, 0, 0.87)'
    );
    expect(autoColors['--mdc-theme-text-secondary-on-background']).toBe(
      'rgba(0, 0, 0, 0.54)'
    );
    expect(autoColors['--mdc-theme-text-hint-on-background']).toBe(
      'rgba(0, 0, 0, 0.38)'
    );
    expect(autoColors['--mdc-theme-text-disabled-on-background']).toBe(
      'rgba(0, 0, 0, 0.38)'
    );
    expect(autoColors['--mdc-theme-text-icon-on-background']).toBe(
      'rgba(0, 0, 0, 0.38)'
    );
  });

  it('should return the correct autoColors for a light theme', () => {
    const colors = {
      '--mdc-theme-primary': '#ffffff',
      '--mdc-theme-surface': '#eeeeee',
      '--mdc-theme-secondary': '#dddddd',
      '--mdc-theme-background': '#222222'
    };

    const autoColors = getAutoColorsForTheme(colors);

    expect(autoColors['--mdc-theme-text-primary-on-background']).toBe(
      'rgba(255, 255, 255, 1)'
    );
    expect(autoColors['--mdc-theme-text-secondary-on-background']).toBe(
      'rgba(255, 255, 255, 0.7)'
    );
    expect(autoColors['--mdc-theme-text-hint-on-background']).toBe(
      'rgba(255, 255, 255, 0.5)'
    );
    expect(autoColors['--mdc-theme-text-disabled-on-background']).toBe(
      'rgba(255, 255, 255, 0.5)'
    );
    expect(autoColors['--mdc-theme-text-icon-on-background']).toBe(
      'rgba(255, 255, 255, 0.5)'
    );
  });
});
