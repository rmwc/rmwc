import React from 'react';

import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
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
          onClick={(evt) => {
            this.setState({ open: !this.state.open });
          }}
        >
          Open Menu
        </Button>

        <Menu
          open={this.state.open}
          foundationRef={console.log}
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
          onClose={(evt) => {
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
          onClick={(evt) => {
            this.setState({ open: !this.state.open });
          }}
        >
          Open Menu
        </Button>

        <MenuSurface
          open={this.state.open}
          foundationRef={console.log}
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
          onOpen={(evt) => {}}
          onClose={(evt) => {
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
  const [selected, setSelected] = useKnob('number', 'Last selected index', -1);
  const [hoisted] = useKnob('boolean', 'hoisted', true);
  const [open, setOpen] = React.useState(true);
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
          onClick={(evt) => {
            setOpen(true);
          }}
        >
          Open Menu
        </Button>
        <Menu
          open={open}
          renderToPortal={hoisted}
          onSelect={evt => setSelected(evt.detail.index)}
          onClose={() => setOpen(false)}
        >
          {options.map((o: string, index: number) => (
            <MenuItem
              key={o}
              activated={selected === index}
            >
              {o}
            </MenuItem>
          ))}
        </Menu>
      </MenuSurfaceAnchor>
    </div>
  );
}

storiesOf('Menus', module)
  .add('Menu', () => <MenuStory />)
  .add('MenuSurface', () => <MenuSurfaceStory />)
  .add('Menu: Always Open', () => {
    const [open] = useKnob('boolean', 'open', true);
    return (
      <Menu open={open}>
        <MenuItem>Cookies</MenuItem>
        <MenuItem>Pizza</MenuItem>
        <MenuItem>Icecream</MenuItem>
      </Menu>
    );
  })
  .add('Menu: hoistToBody', () => (
    <>
      <MenuHoist />
      <MenuHoist />
    </>
  ))
  .add('SimpleMenu', () => (
    <SimpleMenu handle={<Button raised>Open Simple Menu</Button>}>
      <MenuItem>Cookies</MenuItem>
      <MenuItem>Pizza</MenuItem>
      <MenuItem>Icecream</MenuItem>
    </SimpleMenu>
  ));
