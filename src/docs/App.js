import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import { menuContent } from './menuContent';

import { version } from 'rmwc/rmwc';

import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarFixedAdjust,
  ToolbarMenuIcon,
  ToolbarIcon
} from 'rmwc/Toolbar';

import {
  PersistentDrawer,
  PersistentDrawerContent,
  TemporaryDrawer,
  TemporaryDrawerContent
} from 'rmwc/Drawer';

import { ListItem, ListItemText } from 'rmwc/List';

import Submenu from './Submenu';
import Home from './Home';

const MenuItem = ({ url, label }) => {
  return (
    <ListItem>
      <Link to={url}>
        <ListItemText>{label}</ListItemText>
      </Link>
    </ListItem>
  );
};

export class App extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', () => this.doSizeCheck());
    this.doSizeCheck();
  }

  state = {
    menuIsOpen: false,
    isMobile: true
  };

  doSizeCheck() {
    if (window.screen.width > 640) {
      this.setState({ isMobile: false, menuIsOpen: true });
    } else {
      this.setState({ isMobile: true, menuIsOpen: false });
    }
  }

  render() {
    const pageId = `page-${window.location.pathname.split('/').pop()}`;
    const Drawer = this.state.isMobile ? TemporaryDrawer : PersistentDrawer;
    const DrawerContent = this.state.isMobile ?
      TemporaryDrawerContent :
      PersistentDrawerContent;

    return (
      <div id={pageId}>
        <Toolbar fixed waterfall>
          <ToolbarRow>
            <ToolbarSection alignStart>
              <ToolbarMenuIcon
                style={{ color: 'inherit', alignSelf: 'center' }}
                onClick={evt =>
                  this.setState({ menuIsOpen: !this.state.menuIsOpen })
                }
              >
                menu
              </ToolbarMenuIcon>
              <ToolbarTitle>
                <Link to={`${process.env.PUBLIC_URL || '/'}`}>RMWC</Link>
              </ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              <span className="app__version">{version}</span>
              <ToolbarIcon
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
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        <ToolbarFixedAdjust />

        <div className="demo-content">
          {/* Nav */}
          <Drawer
            id="main-nav"
            open={this.state.menuIsOpen}
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
            <Switch>
              <Route
                path={`${process.env.PUBLIC_URL || '/'}`}
                exact
                component={Home}
              />
              {menuContent.map(m => {
                if (m.options) {
                  return m.options.map(v => (
                    <Route
                      path={v.url}
                      exact
                      component={v.component}
                      key={v.label + 'sub'}
                    />
                  ));
                }

                return (
                  <Route
                    path={m.url}
                    exact
                    key={m.label}
                    component={m.component}
                  />
                );
              })}
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
