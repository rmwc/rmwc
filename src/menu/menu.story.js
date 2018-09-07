import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { Menu, MenuItem, MenuSurfaceAnchor, SimpleMenu, MenuSurface } from './';
import { Button } from '@rmwc/button';

class MenuStory extends React.Component {
  state = {
    open: false
  };
  render() {
    return (
      <MenuSurfaceAnchor
        style={{ position: 'absolute', top: '24px', left: '24px' }}
      >
        <Button
          raised
          onClick={evt => {
            this.setState({ open: !this.state.open });
          }}
        >
          Open Menu
        </Button>

        <Menu
          open={this.state.open}
          anchorCorner={select(
            'anchorCorner',
            {
              bottomEnd: 'BOTTOM_END',
              bottom: 'BOTTOM_LEFT',
              bottomRight: 'BOTTOM_RIGHT',
              bottomStart: 'BOTTOM_START',
              topEnd: 'TOP_END',
              topLeft: 'TOP_LEFT',
              topRight: 'TOP_RIGHT',
              topStart: 'TOP_START'
            },
            'topStart'
          )}
          onClose={evt => {
            this.setState({ open: false });
          }}
        >
          <MenuItem>Cookies</MenuItem>
          <MenuItem>Pizza</MenuItem>
          <MenuItem>Icecream</MenuItem>
        </Menu>
      </MenuSurfaceAnchor>
    );
  }
}

class MenuSurfaceStory extends React.Component {
  state = {
    open: false
  };
  render() {
    return (
      <MenuSurfaceAnchor>
        <Button
          raised
          onClick={evt => {
            this.setState({ open: !this.state.open });
          }}
        >
          Open Menu
        </Button>

        <MenuSurface
          open={this.state.open}
          anchorCorner={select(
            'anchorCorner',
            {
              bottomEnd: 'BOTTOM_END',
              bottom: 'BOTTOM_LEFT',
              bottomRight: 'BOTTOM_RIGHT',
              bottomStart: 'BOTTOM_START',
              topEnd: 'TOP_END',
              topLeft: 'TOP_LEFT',
              topRight: 'TOP_RIGHT',
              topStart: 'TOP_START'
            },
            'topStart'
          )}
          onOpen={evt => {}}
          onClose={evt => {
            this.setState({ open: false });
          }}
        >
          This is the new menu surface component
        </MenuSurface>
      </MenuSurfaceAnchor>
    );
  }
}

storiesOf('Menus', module)
  .add('Menu', () => <MenuStory />)
  .add('MenuSurface', () => <MenuSurfaceStory />)
  .add('Menu: Always Open', () => (
    <Menu open={true}>
      <MenuItem>Cookies</MenuItem>
      <MenuItem>Pizza</MenuItem>
      <MenuItem>Icecream</MenuItem>
    </Menu>
  ))
  .add('SimpleMenu', () => (
    <SimpleMenu handle={<Button raised>Open Simple Menu</Button>}>
      <MenuItem>Cookies</MenuItem>
      <MenuItem>Pizza</MenuItem>
      <MenuItem>Icecream</MenuItem>
    </SimpleMenu>
  ));
