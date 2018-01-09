import React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { SimpleMenu, MenuItem, MenuAnchor } from './';
import { Button } from '../Button';
import { storyWithState } from '../Base/story-with-state';

const MenuStory = storyWithState(
  state => ({
    open: boolean('open', state.open || false)
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

        <SimpleMenu
          open={this.state.open}
          anchorCorner={select(
            'anchorCorner',
            {
              BOTTOM_END: 'BOTTOM_END',
              BOTTOM_LEFT: 'BOTTOM_LEFT',
              BOTTOM_RIGHT: 'BOTTOM_RIGHT',
              BOTTOM_START: 'BOTTOM_START',
              TOP_END: 'TOP_END',
              TOP_LEFT: 'TOP_LEFT',
              TOP_RIGHT: 'TOP_RIGHT',
              TOP_START: 'TOP_START'
            },
            'TOP_START'
          )}
          onClose={evt => this.setState({ open: false })}
        >
          <MenuItem>Cookies</MenuItem>
          <MenuItem>Pizza</MenuItem>
          <MenuItem>Icecream</MenuItem>
        </SimpleMenu>
      </MenuAnchor>
    );
  }
);

storiesOf('Menus', module).add('Menu', () => <MenuStory />);
