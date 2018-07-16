import * as React from 'react';
import { Route, Link, Switch as RouterSwitch } from 'react-router-dom';

import { menuContent } from './menuContent';

import { version } from 'rmwc/rmwc';

import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarNavigationIcon,
  TopAppBarActionItem
} from 'rmwc/TopAppBar';

import { Theme } from 'rmwc/Theme';
import { TabBar, Tab } from 'rmwc/Tabs';

import { Drawer, DrawerContent } from 'rmwc/Drawer';

import {
  ListItem,
  ListItemText,
  ListGroupSubheader,
  ListItemGraphic,
  ListItemMeta
} from 'rmwc/List';

import { Menu, MenuAnchor } from 'rmwc/Menu';
import { Button } from 'rmwc/Button';

import Submenu from './Submenu';
import Home from './Home';

const toCamel = str =>
  str.replace(/(-[a-z])/g, $1 => $1.toUpperCase().replace('-', ''));

const DEFAULT_THEME = {
  '--mdc-theme-primary': '#6200ee',
  '--mdc-theme-secondary': '#03dac4',
  '--mdc-theme-background': '#fff',
  '--mdc-theme-surface': '#fff',
  '--mdc-theme-on-primary': '#fff',
  '--mdc-theme-on-secondary': '#fff',
  '--mdc-theme-on-surface': '#000',
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

const THEMES = {
  Baseline: {
    '--mdc-theme-primary': '#6200ee',
    '--mdc-theme-secondary': '#03dac4'
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
    '--mdc-theme-secondary': '#feeae6',
    '--mdc-theme-on-primary': '#442b2d',
    '--mdc-theme-on-secondary': '#442b2d',
    '--mdc-theme-on-surface': '#442b2d'
  }
};

const getTheme = themeName => {
  return {
    ...DEFAULT_THEME,
    ...(THEMES[themeName] || {})
  };
};

const MainMenuItem = ({ url, label }) => {
  return (
    <ListItem
      onClick={() => window.scrollTo(0, 0)}
      activated={
        window.location.pathname.split('/').pop() === url.split('/').pop()
      }
    >
      <Link to={url}>
        <ListItemText>{label}</ListItemText>
      </Link>
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

const AppBar = ({ onNavClick, children }) => (
  <TopAppBar fixed className="app__top-app-bar">
    <TopAppBarRow>
      <TopAppBarSection alignStart>
        <TopAppBarNavigationIcon onClick={onNavClick}>
          menu
        </TopAppBarNavigationIcon>

        <TopAppBarTitle tag={Link} to="/">
          RMWC
        </TopAppBarTitle>
        <span className="app__version">{version}</span>
      </TopAppBarSection>
      <TopAppBarSection alignEnd>
        {children}
        <TopAppBarActionItem
          tag="a"
          href="https://github.com/jamesmfriedman/rmwc"
          use={<GithubIcon />}
        />
      </TopAppBarSection>
    </TopAppBarRow>
  </TopAppBar>
);

const ColorBlock = ({ color, size = 1.5 }) => (
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

class ThemePicker extends React.Component {
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
      <MenuAnchor>
        <Menu
          open={this.state.open}
          onCancel={() => this.setState({ open: false })}
        >
          <ListGroupSubheader>Themes</ListGroupSubheader>
          {Object.keys(THEMES).map(themeName => {
            const theme = getTheme(themeName);
            return (
              <ListItem
                key={themeName}
                role="menuitem"
                tabIndex="0"
                onClick={evt => {
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
                  use={themeName === selectedThemeName ? 'check' : ''}
                />
                <ListItemText>{themeName}</ListItemText>
                <ListItemMeta basename="" tag="span">
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
            onChange={evt =>
              this.setState({ activeTabIndex: evt.detail.activeTabIndex })
            }
          >
            <Tab>ThemeProvider</Tab>
            <Tab>CSS</Tab>
          </TabBar>
          <ListItem
            onClick={evt => this.setState({ open: true })}
            ripple={false}
            style={{
              backgroundColor: '#f2f2f2',
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
                  want to apply a custom theme.<br />
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
                {Object.entries(selectedTheme).map(([t, val], index, arr) => (
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
                        &nbsp;&nbsp;{toCamel(t.split('--mdc-theme-')[1])}:
                      </span>{' '}
                      '{val}'{index < arr.length - 1 ? ',' : ''}
                    </span>

                    <ColorBlock color={val} size="1" />
                  </div>
                ))}
                {'}}'}
                <span className="token punctuation">&gt;</span>
                <br />
                &nbsp;&nbsp;<span className="token punctuation">&lt;</span>
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
                  tag in your app and customize to your liking.<br />
                  <br />
                </div>
                <span style={{ color: '#690' }}>:root</span> {'{'}
                {Object.entries(selectedTheme).map(([t, val]) => (
                  <div
                    key={t}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span>
                      <span style={{ color: '#07a' }}>&nbsp;&nbsp;{t}:</span>{' '}
                      {val};
                    </span>

                    <ColorBlock color={val} size="1" />
                  </div>
                ))}
                {'}'}
              </div>
            )}
          </ListItem>
          <div style={{ padding: '1rem' }}>
            <Button>Done</Button>
          </div>
        </Menu>
        <TopAppBarActionItem
          onClick={() => this.setState({ open: !this.state.open })}
          theme="on-primary"
          use="color_lens"
        />
      </MenuAnchor>
    );
  }
}

const ThemeStyleTag = ({ themeName }) => (
  <style>{`
    :root {
      ${Object.entries(getTheme(themeName))
    .map(([t, val]) => `${t}: ${val};`)
    .join('\n')}
    }
  `}</style>
);

const Nav = props => (
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
  </Drawer>
);

export class App extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', () => this.doSizeCheck());
    this.doSizeCheck(true);
  }

  componentDidUpdate(prevProps, prevState) {
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

  doSizeCheck(initial) {
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
      <Theme className="app__root" tag="div" id={pageId}>
        <ThemeStyleTag themeName={this.state.theme} />
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
            persistent={!this.state.isMobile}
            temporary={this.state.isMobile}
            onClose={() => this.setState({ menuIsOpen: false })}
          />

          <main className="app__content">
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
          </main>
        </div>
      </Theme>
    );
  }
}

export default App;
