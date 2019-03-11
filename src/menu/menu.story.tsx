import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { select, array } from '@storybook/addon-knobs';
import { Menu, MenuItem, MenuSurfaceAnchor, SimpleMenu, MenuSurface } from './';
import { Button } from '../button';
import { useKnob } from '../base/utils/use-knob';

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
          anchorCorner={
            select(
              'anchorCorner',
              [
                'bottomEnd',
                'bottomLeft',
                'bottomRight',
                'bottomStart',
                'topEnd',
                'topLeft',
                'topRight',
                'topStart'
              ],
              'topStart'
            ) as any
          }
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
          anchorCorner={
            select(
              'anchorCorner',
              [
                'bottomEnd',
                'bottomLeft',
                'bottomRight',
                'bottomStart',
                'topEnd',
                'topLeft',
                'topRight',
                'topStart'
              ],
              'topStart'
            ) as any
          }
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

function MenuHoist() {
  const [hoisted] = useKnob('boolean', 'hoisted', false);
  const [open, setOpen] = useKnob('boolean', 'open', false);
  const [options] = useKnob('array', 'options', [
    'Cookies',
    'Pizza',
    'Icecream'
  ]);
  return (
    <div style={{ margin: '200px', height: '56px', overflow: 'hidden' }}>
      <MenuSurfaceAnchor>
        <Button
          raised
          onClick={evt => {
            setOpen(true);
          }}
        >
          Open Menu
        </Button>
        <Menu open={open} hoistToBody={hoisted} onClose={() => setOpen(false)}>
          {options.map((o: string) => (
            <MenuItem key={o}>{o}</MenuItem>
          ))}
        </Menu>
      </MenuSurfaceAnchor>
    </div>
  );
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
  .add('Menu: hoistToBody', () => <MenuHoist />)
  .add('SimpleMenu', () => (
    <SimpleMenu handle={<Button raised>Open Simple Menu</Button>}>
      <MenuItem>Cookies</MenuItem>
      <MenuItem>Pizza</MenuItem>
      <MenuItem>Icecream</MenuItem>
    </SimpleMenu>
  ));
