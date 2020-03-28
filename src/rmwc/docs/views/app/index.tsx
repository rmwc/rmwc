// eslint-disable-next-line  @typescript-eslint/no-unused-vars
import * as RMWC from '@rmwc/types';
import React, { useEffect, useState } from 'react';
import { Route, Link, Switch as RouterSwitch } from 'react-router-dom';

import { menuContent, MenuItemT } from '../../common/menu-content';

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

import {
  Drawer,
  DrawerContent,
  DrawerAppContent,
  DrawerProps
} from '@rmwc/drawer';

import { ListItem, CollapsibleList, SimpleListItem, List } from '@rmwc/list';

import { SimpleMenu, MenuItem } from '@rmwc/menu';
import { Portal } from '@rmwc/base';

import Home from '../home';
import { SiteSearch } from '../site-search';
import { DOC_VERSIONS } from '../../common/doc-versions';
import { ThemePicker, getTheme } from './theme-picker';
import { history } from '../../common/history';

const MainMenuItem = ({ url, label }: { url?: string; label: string }) => {
  return (
    <ListItem
      tag={Link}
      to={url}
      onClick={() => window.scrollTo(0, 0)}
      activated={
        window.location.pathname.split('/').pop() === url?.split('/').pop()
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

function AppBar({
  onNavClick,
  children
}: {
  onNavClick: (evt: React.SyntheticEvent<HTMLElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <>
      <TopAppBar fixed className="app__top-app-bar">
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            <TopAppBarNavigationIcon onClick={onNavClick} icon="menu" />
            <TopAppBarTitle tag={Link} to="/">
              RMWC
            </TopAppBarTitle>
            <SimpleMenu
              handle={
                <span className="app__version">
                  <span>{version}</span> <Icon icon="arrow_drop_down" />
                </span>
              }
            >
              <MenuItem>{version}</MenuItem>
              {DOC_VERSIONS.map(v => (
                <MenuItem key={v} tag="a" href={`/version/${v}`}>
                  {v}
                </MenuItem>
              ))}
            </SimpleMenu>

            <SiteSearch />
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
    </>
  );
}

function Nav(props: DrawerProps) {
  return (
    <>
      <Drawer id="main-nav" {...props}>
        <DrawerContent>
          <List>
            <NavItems options={menuContent} />
          </List>
        </DrawerContent>
        <Ripple
          tag="a"
          href="https://opencollective.com/rmwc"
          className="made-by"
        >
          <Typography use="caption">
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
    </>
  );
}

export function App() {
  const isMobile = window.innerWidth < 640;
  const [menuIsOpen, setMenuIsOpen] = useState(!isMobile);
  const [pageId, setPageId] = useState(
    `page-${window.location.pathname.split('/').pop() || 'home'}`
  );
  const [theme, setTheme] = useState(
    window.localStorage.getItem('rmwcTheme') || 'Baseline'
  );

  useEffect(() => {
    isMobile && setMenuIsOpen(false);
    const listener = (evt: any) => {
      const _isMobile = window.innerWidth < 640;
      if (_isMobile !== isMobile) {
        setMenuIsOpen(!_isMobile);
      }
    };
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [isMobile]);

  useEffect(() => {
    history.listen(() => {
      setPageId(`page-${window.location.pathname.split('/').pop() || 'home'}`);
    });
  }, []);

  return (
    <ThemeProvider
      options={getTheme(theme)}
      className="app__root"
      tag="div"
      id={pageId}
    >
      <AppBar
        onNavClick={evt => {
          setMenuIsOpen(!menuIsOpen);
        }}
      >
        {!isMobile && (
          <ThemePicker
            selectedThemeName={theme}
            onThemeClick={themeName => {
              window.localStorage.setItem('rmwcTheme', themeName);
              setTheme(themeName);
            }}
          />
        )}
      </AppBar>

      <div className="demo-content">
        <Nav
          open={menuIsOpen}
          dismissible={!isMobile}
          modal={isMobile}
          onClose={() => setMenuIsOpen(false)}
        />

        <DrawerAppContent tag="main" className="app__content">
          <RouterSwitch>
            <Route path="/" exact component={Home} />
            <DocRoutes options={menuContent} />
          </RouterSwitch>
        </DrawerAppContent>
      </div>
      <Portal />
    </ThemeProvider>
  );
}

function NavItems({ options }: { options: MenuItemT[] }) {
  return (
    <>
      {options.map(m => {
        if (m.options) {
          return (
            <CollapsibleList
              key={m.label}
              defaultOpen={
                m.label === 'Components' ||
                m.options?.some(
                  o =>
                    o.url &&
                    window.location.pathname.split('/').pop() ===
                      o.url?.split('/').pop()
                )
              }
              handle={
                <SimpleListItem text={m.label} metaIcon="chevron_right" />
              }
            >
              <NavItems options={m.options!} />
            </CollapsibleList>
          );
        }
        return <MainMenuItem label={m.label} url={m.url!} key={m.label} />;
      })}
    </>
  );
}

function DocRoutes({ options }: { options: MenuItemT[] }) {
  return (
    <>
      {options.map((m, index) => {
        if (m.options) {
          return <DocRoutes key={index} options={m.options} />;
        }

        return (
          <Route
            path={m.url}
            exact
            key={index}
            render={() => {
              document.title = `RMWC | React Material Web Components | ${m.label}`;
              const Component = m.component || <></>;
              // @ts-ignore
              return <Component />;
            }}
          />
        );
      })}
    </>
  );
}

export default App;
