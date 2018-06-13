import React from 'react';
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

import { Drawer, DrawerContent } from 'rmwc/Drawer';

import { ListItem, ListItemText } from 'rmwc/List';

import Submenu from './Submenu';
import Home from './Home';

const MenuItem = ({ url, label }) => {
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
    isMobile: true
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
        <TopAppBar fixed className="app__top-app-bar">
          <TopAppBarRow>
            <TopAppBarSection alignStart>
              <TopAppBarNavigationIcon
                style={{ color: 'inherit', alignSelf: 'center' }}
                onClick={evt =>
                  this.setState({ menuIsOpen: !this.state.menuIsOpen })
                }
              >
                menu
              </TopAppBarNavigationIcon>

              <TopAppBarTitle tag={Link} to="/">
                RMWC
              </TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection alignEnd>
              {!this.state.isMobile && (
                <React.Fragment>
                  <span className="app__version">{version}</span>
                </React.Fragment>
              )}
              <TopAppBarActionItem
                tag="a"
                href="https://github.com/jamesmfriedman/rmwc"
                use={
                  <svg
                    style={{ width: '24px', height: '24px' }}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#ffffff"
                      d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                    />
                  </svg>
                }
              />
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>

        <div className="demo-content">
          {/* Nav */}
          <Drawer
            id="main-nav"
            open={this.state.menuIsOpen}
            persistent={!this.state.isMobile}
            temporary={this.state.isMobile}
            onClose={() => this.setState({ menuIsOpen: false })}
          >
            <DrawerContent>
              {menuContent.map(m => {
                if (m.options) {
                  return (
                    <Submenu label={m.label} key={m.label}>
                      {m.options.map(v => (
                        <MenuItem key={v.label} label={v.label} url={v.url} />
                      ))}
                    </Submenu>
                  );
                }
                return <MenuItem label={m.label} url={m.url} key={m.label} />;
              })}
            </DrawerContent>
          </Drawer>
          {/* End Nav */}

          <main className="app__content">
            <RouterSwitch>
              <Route path={'/'} exact component={Home} />
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
            </RouterSwitch>
          </main>
        </div>
      </Theme>
    );
  }
}

export default App;
