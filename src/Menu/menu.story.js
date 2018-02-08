import React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { Menu, MenuItem, MenuAnchor } from './';
import { Button } from '../Button';
import { storyWithState } from '../Base/story-with-state';

const MenuStory = storyWithState(
  state => ({
    open: boolean('open', state.open || true)
  }),
  function() {
    return (
      <MenuAnchor style={{ position: 'absolute', top: '24px', left: '24px' }}>
        <Button
          raised
          onClick={evt => this.setState({ open: !this.state.open })}
        >
          Open Menu
        </Button>

        <Menu
          open={this.state.open}
          startOpen={boolean('startOpen', true)}
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
          onClose={evt => this.setState({ open: false })}
        >
          <MenuItem>Cookies</MenuItem>
          <MenuItem>Pizza</MenuItem>
          <MenuItem>Icecream</MenuItem>
        </Menu>
      </MenuAnchor>
    );
  }
);

storiesOf('Menus', module).add('Menu', () => <MenuStory />);
