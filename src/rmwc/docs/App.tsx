import * as React from 'react';
// @ts-ignore
import { Route, Link, Switch as RouterSwitch } from 'react-router-dom';

import { menuContent } from './menuContent';

// @ts-ignore
import { version } from 'rmwc/rmwc';

import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarNavigationIcon,
  TopAppBarActionItem,
  TopAppBarFixedAdjust
} from '@rmwc/top-app-bar';

import { Icon } from '@rmwc/icon';
import { ThemeProvider } from '@rmwc/theme';
import { Typography } from '@rmwc/typography';
import { Ripple } from '@rmwc/ripple';
import { getAutoColorsForTheme } from '@rmwc/theme/utils';
import { TabBar, Tab } from '@rmwc/tabs';

import { Drawer, DrawerContent, DrawerAppContent } from '@rmwc/drawer';

import {
  ListItem,
  ListGroupSubheader,
  ListItemGraphic,
  ListItemMeta
} from '@rmwc/list';

import { MenuSurface, MenuSurfaceAnchor } from '@rmwc/menu';
import { Button } from '@rmwc/button';

import Submenu from './Submenu';
import Home from './Home';
import { ThemeOptionT } from '@rmwc/base/withTheme';
import { toCamel } from '@rmwc/base/utils/strings';

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
  Shrine: {
    '--mdc-theme-primary': '#ffdbcf',
    '--mdc-theme-secondary': '#feeae6'
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

const getTheme = (themeName: string) => {
  const theme = {
    ...DEFAULT_THEME,
    ...(THEMES[themeName] || {})
  };

  const colors = getAutoColorsForTheme(theme);
  const merged = {
    ...TEXT_DEFAULTS,
    ...colors
  };

  const order: ThemeOptionT[] = [
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

  return order.reduce((acc, key) => {
    const newKey = `--mdc-theme-${key}`;
    // @ts-ignore
    acc[newKey] = merged[newKey];
    return acc;
  }, {});
};

const MainMenuItem = ({ url, label }: { url: string; label: string }) => {
  return (
    <ListItem
      tag={Link}
      {...{ to: url } as any}
      onClick={() => window.scrollTo(0, 0)}
      activated={
        window.location.pathname.split('/').pop() === url.split('/').pop()
      }
    >
      <span>{label}</span>
    </ListItem>
  );
};

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24">
    <path
      fill="currentColor"
      d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
    />
  </svg>
);

const AppBar = ({
  onNavClick,
  children
}: {
  onNavClick: (evt: React.SyntheticEvent<HTMLElement>) => void;
  children: React.ReactNode;
}) => {
  return (
    <React.Fragment>
      <TopAppBar fixed className="app__top-app-bar">
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarNavigationIcon onClick={onNavClick} icon="menu" />

            <TopAppBarTitle tag={Link} {...{ to: '/' }}>
              RMWC
            </TopAppBarTitle>
            <span className="app__version">{version}</span>
          </TopAppBarSection>
          <TopAppBarSection alignEnd>
            {children}
            <TopAppBarActionItem
              tag="a"
              href="https://github.com/jamesmfriedman/rmwc"
              icon={<GithubIcon />}
            />
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust />
    </React.Fragment>
  );
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

class ThemePicker extends React.Component<{
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
          style={{ maxWidth: '100vw', width: '520px' }}
          open={this.state.open}
          onClose={() => {
            this.setState({ open: false });
          }}
        >
          <ListGroupSubheader>Themes</ListGroupSubheader>
          {Object.keys(THEMES).map(themeName => {
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
            onClick={evt => this.setState({ open: true })}
            style={{ margin: '1rem auto -1rem auto' }}
            activeTabIndex={this.state.activeTabIndex}
            onActivate={evt =>
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

const Nav = (props: any) => (
  <React.Fragment>
    <Drawer id="main-nav" {...props}>
      <DrawerContent>
        {menuContent.map(m => {
          if (m.options) {
            return (
              <Submenu label={m.label} key={m.label}>
                {m.options.map(v => (
                  <MainMenuItem key={v.label} label={v.label} url={v.url} />
                ))}
              </Submenu>
            );
          }
          return <MainMenuItem label={m.label} url={m.url} key={m.label} />;
        })}
      </DrawerContent>
      <Ripple>
        <Typography
          tag="a"
          use="caption"
          className="made-by"
          href="https://opencollective.com/rmwc"
        >
          <Icon icon="https://s.gravatar.com/avatar/0b38f1a5ae97a182822f4bca53a2368f?s=80" />
          <div>
            <div>
              Made with{' '}
              <span role="img" aria-label="heart">
                ❤️
              </span>{' '}
              in Sunny FL.
            </div>
            <div className="made-by__link">Donate on Open Collective</div>
          </div>
        </Typography>
      </Ripple>
    </Drawer>
  </React.Fragment>
);

export class App extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', () => this.doSizeCheck());
    this.doSizeCheck(true);
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    // a hack to help components layout that depend on window events
    // The size of the content changes on drawer open and close
    if (prevState.menuIsOpen !== this.state.menuIsOpen) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 300);
    }
  }

  state = {
    menuIsOpen: false,
    isMobile: true,
    theme: window.localStorage.getItem('rmwcTheme') || 'Baseline'
  };

  doSizeCheck(initial?: boolean) {
    const isMobile = window.innerWidth < 640;
    const menuIsOpen =
      initial && window.innerWidth > 640 ? true : this.state.menuIsOpen;

    if (
      this.state.isMobile !== isMobile ||
      this.state.menuIsOpen !== menuIsOpen
    ) {
      this.setState({ isMobile, menuIsOpen });
    }
  }

  render() {
    const pageId = `page-${window.location.pathname.split('/').pop() ||
      'home'}`;

    return (
      <ThemeProvider
        options={getTheme(this.state.theme)}
        className="app__root"
        tag="div"
        id={pageId}
      >
        <AppBar
          onNavClick={evt =>
            this.setState({ menuIsOpen: !this.state.menuIsOpen })
          }
        >
          {!this.state.isMobile && (
            <ThemePicker
              selectedThemeName={this.state.theme}
              onThemeClick={themeName => {
                window.localStorage.setItem('rmwcTheme', themeName);
                this.setState({ theme: themeName });
              }}
            />
          )}
        </AppBar>

        <div className="demo-content">
          <Nav
            open={this.state.menuIsOpen}
            dismissible={!this.state.isMobile}
            modal={this.state.isMobile}
            onClose={() => this.setState({ menuIsOpen: false })}
          />

          <DrawerAppContent tag="main" className="app__content">
            <RouterSwitch>
              {menuContent.map(m => {
                if (m.options) {
                  return m.options.map(v => (
                    <Route
                      path={v.url}
                      exact
                      render={() => {
                        document.title = `RMWC | React Material Web Components | ${
                          v.label
                        }`;
                        return <v.component />;
                      }}
                      key={v.label + 'sub'}
                    />
                  ));
                }

                return (
                  <Route
                    path={m.url}
                    exact
                    key={m.label}
                    render={() => {
                      document.title = `RMWC | React Material Web Components | ${
                        m.label
                      }`;
                      return <m.component />;
                    }}
                  />
                );
              })}
              <Route path="/" exact component={Home} />
            </RouterSwitch>
          </DrawerAppContent>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
