import { Tab, TabBar } from '@rmwc/tabs';
import * as RMWC from '@rmwc/types';
import React from 'react';

import {
  ListGroupSubheader,
  ListItem,
  ListItemGraphic,
  ListItemMeta
} from '@rmwc/list';

import { MenuSurface, MenuSurfaceAnchor } from '@rmwc/menu';

import { toCamel, toDashCase } from '@rmwc/base';
import { Button } from '@rmwc/button';
import { getAutoColorsForTheme } from '@rmwc/theme';
import { TopAppBarActionItem } from '@rmwc/top-app-bar';

const DEFAULT_THEME = {
  '--mdc-theme-primary': '#6200ee',
  '--mdc-theme-secondary': '#03dac4',
  '--mdc-theme-background': '#fff',
  '--mdc-theme-surface': '#fff',
  '--mdc-theme-error': '#b00020'
};

const TEXT_DEFAULTS = {
  '--mdc-theme-on-primary': '#fff',
  '--mdc-theme-on-secondary': '#fff',
  '--mdc-theme-on-surface': '#000',
  '--mdc-theme-on-error': '#fff',
  '--mdc-theme-text-primary-on-background': 'rgba(0, 0, 0, 0.87)',
  '--mdc-theme-text-secondary-on-background': 'rgba(0, 0, 0, 0.54)',
  '--mdc-theme-text-hint-on-background': 'rgba(0, 0, 0, 0.38)',
  '--mdc-theme-text-disabled-on-background': 'rgba(0, 0, 0, 0.38)',
  '--mdc-theme-text-icon-on-background': 'rgba(0, 0, 0, 0.38)',
  '--mdc-theme-text-primary-on-light': 'rgba(0, 0, 0, 0.87)',
  '--mdc-theme-text-secondary-on-light': 'rgba(0, 0, 0, 0.54)',
  '--mdc-theme-text-hint-on-light': 'rgba(0, 0, 0, 0.38)',
  '--mdc-theme-text-disabled-on-light': 'rgba(0, 0, 0, 0.38)',
  '--mdc-theme-text-icon-on-light': 'rgba(0, 0, 0, 0.38)',
  '--mdc-theme-text-primary-on-dark': 'white',
  '--mdc-theme-text-secondary-on-dark': 'rgba(255, 255, 255, 0.7)',
  '--mdc-theme-text-hint-on-dark': 'rgba(255, 255, 255, 0.5)',
  '--mdc-theme-text-disabled-on-dark': 'rgba(255, 255, 255, 0.5)',
  '--mdc-theme-text-icon-on-dark': 'rgba(255, 255, 255, 0.5)'
};

const THEMES: { [key: string]: { [key: string]: string } } = {
  Baseline: {
    '--mdc-theme-primary': '#6200ee',
    '--mdc-theme-secondary':
      '#03dac4' /** Any theme option pointing to a valid CSS value. */
  },
  Crane: {
    '--mdc-theme-primary': '#5d1049',
    '--mdc-theme-secondary': '#fa3336'
  },
  Fortnightly: {
    '--mdc-theme-primary': '#303030',
    '--mdc-theme-secondary': '#661fff'
  },
  Miami: {
    '--mdc-theme-primary': '#fc318c',
    '--mdc-theme-secondary': '#31fcee'
  },
  Dark: {
    '--mdc-theme-background': '#212121',
    '--mdc-theme-surface': '#37474F',
    '--mdc-theme-on-surface': 'rgba(255,255,255,.87)',
    '--mdc-theme-primary': '#24aee9',
    '--mdc-theme-on-primary': 'rgba(255,255,255,.87)',
    '--mdc-theme-secondary': '#e539ff',
    '--mdc-theme-on-secondary': 'rgba(0,0,0,0.87)'
  }
};

export class ThemePicker extends React.Component<{
  selectedThemeName: string;
  onThemeClick: (themeName: string) => void;
}> {
  state = {
    open: false,
    activeTabIndex: 0
  };

  componentDidUpdate() {
    window.requestAnimationFrame(() =>
      window.dispatchEvent(new Event('resize'))
    );
  }

  render() {
    const { selectedThemeName, onThemeClick } = this.props;
    const selectedTheme = getTheme(selectedThemeName);
    return (
      <MenuSurfaceAnchor>
        <MenuSurface
          renderToPortal
          style={{ maxWidth: '100vw', width: '520px' }}
          open={this.state.open}
          onClose={() => {
            this.setState({ open: false });
          }}
        >
          <ListGroupSubheader>Themes</ListGroupSubheader>
          {Object.keys(THEMES).map((themeName) => {
            const theme: { [key: string]: string } = getTheme(themeName);
            return (
              <ListItem
                style={{ cursor: 'pointer' }}
                key={themeName}
                role="menuitem"
                tabIndex={0}
                onClick={(evt: React.MouseEvent<HTMLDivElement>) => {
                  evt.stopPropagation();
                  onThemeClick(themeName);
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: '0',
                    left: '0'
                  }}
                />
                <ListItemGraphic
                  icon={themeName === selectedThemeName ? 'check' : ''}
                />
                {themeName}
                <ListItemMeta>
                  <ColorBlock color={theme['--mdc-theme-primary']} />
                  <ColorBlock color={theme['--mdc-theme-secondary']} />
                  <ColorBlock color={theme['--mdc-theme-background']} />
                  <ColorBlock color={theme['--mdc-theme-surface']} />
                </ListItemMeta>
              </ListItem>
            );
          })}
          <TabBar
            onClick={() => this.setState({ open: true })}
            style={{ margin: '1rem auto -1rem auto' }}
            activeTabIndex={this.state.activeTabIndex}
            onActivate={(evt) =>
              this.setState({ activeTabIndex: evt.detail.index })
            }
          >
            <Tab>ThemeProvider</Tab>
            <Tab>CSS</Tab>
          </TabBar>
          <ListItem
            onClick={() => this.setState({ open: true })}
            ripple={false}
            style={{
              backgroundColor: 'rgba(0,0,0,.05)',
              padding: '1rem',
              marginTop: '1rem',
              display: 'block',
              height: 'auto',
              userSelect: 'initial',
              cursor: 'text'
            }}
          >
            {this.state.activeTabIndex === 0 ? (
              <div>
                <div style={{ whiteSpace: 'normal' }}>
                  <b>Theme your App!</b>
                  <br />
                  Place this tag around the root of your App, or anywhere you
                  want to apply a custom theme.
                  <br />
                  <br />
                </div>
                <span className="token keyword">import</span> {'{'}{' '}
                ThemeProvider {'}'} <span className="token keyword">from</span>{' '}
                <span className="token string">'rmwc/Theme';</span>
                <br />
                <br />
                <span className="token punctuation">&lt;</span>
                <span className="token tag">ThemeProvider </span>
                <span className="token attr-name">options</span>={'{{'}
                {Object.entries(selectedTheme).map(
                  ([t, val]: [string, any], index, arr) => (
                    <div
                      key={t}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span>
                        <span style={{ color: '#07a' }}>
                          &nbsp;&nbsp;
                          {toCamel(t.split('--mdc-theme-')[1])}:
                        </span>{' '}
                        '{val}'{index < arr.length - 1 ? ',' : ''}
                      </span>

                      <ColorBlock color={val} size={1} />
                    </div>
                  )
                )}
                {'}}'}
                <span className="token punctuation">&gt;</span>
                <br />
                &nbsp;&nbsp;
                <span className="token punctuation">&lt;</span>
                <span className="token tag">App </span>
                <span className="token punctuation">/&gt;</span>
                <br />
                <span className="token punctuation">&lt;/</span>
                <span className="token tag">ThemeProvider </span>
                <span className="token punctuation">&gt;</span>
              </div>
            ) : (
              <div>
                <div style={{ whiteSpace: 'normal' }}>
                  <b>Theme your App!</b>
                  <br />
                  Copy and paste these rules into your main css file, or a style
                  tag in your app and customize to your liking.
                  <br />
                  <br />
                </div>
                <span style={{ color: '#690' }}>:root</span> {'{'}
                {Object.entries(selectedTheme).map(
                  ([t, val]: [string, any]) => (
                    <div
                      key={t}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span>
                        <span style={{ color: '#07a' }}>
                          &nbsp;&nbsp;
                          {t}:
                        </span>{' '}
                        {val};
                      </span>

                      <ColorBlock color={val} size={1} />
                    </div>
                  )
                )}
                {'}'}
              </div>
            )}
          </ListItem>
          <div style={{ padding: '1rem' }}>
            <Button>Done</Button>
          </div>
        </MenuSurface>
        <TopAppBarActionItem
          onClick={() => this.setState({ open: !this.state.open })}
          theme="onPrimary"
          icon="color_lens"
        />
      </MenuSurfaceAnchor>
    );
  }
}

export const getTheme = (themeName: string) => {
  const theme = {
    ...DEFAULT_THEME,
    ...(THEMES[themeName] || {})
  };

  const colors = getAutoColorsForTheme(theme);
  const merged: { [key: string]: string } = {
    ...TEXT_DEFAULTS,
    ...colors
  };

  const order: RMWC.ThemeOptionT[] = [
    'primary',
    'secondary',
    'error',
    'background',
    'surface',
    'onPrimary',
    'onSecondary',
    'onSurface',
    'onError',
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

  return order.reduce<{ [key: string]: string }>((acc, key) => {
    const newKey = `--mdc-theme-${toDashCase(key!)}`;
    acc[newKey] = merged[newKey];
    return acc;
  }, {});
};

const ColorBlock = ({
  color,
  size = 1.5
}: {
  color: string;
  size?: number;
}) => (
  <div
    style={{
      display: 'inline-block',
      backgroundColor: color,
      border: '1px solid rgba(0,0,0,.25)',
      verticalAlign: 'middle',
      marginLeft: '0.5rem',
      height: `${size}rem`,
      width: `${size}rem`,
      borderRadius: '3px',
      boxSizing: 'border-box'
    }}
  />
);
