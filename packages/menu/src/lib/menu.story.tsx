import React, { useState } from 'react';
import { Button } from '@rmwc/button';
import { Menu, MenuItem, SimpleMenu } from './menu'; // replace with your actual component import
import { MenuSurface, MenuSurfaceAnchor } from './menu-surface';
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Menus',
  component: Menu,
  argTypes: {
    anchorCorner: {
      control: {
        type: 'select'
      },
      options: [
        'bottomEnd',
        'bottomLeft',
        'bottomRight',
        'bottomStart',
        'topEnd',
        'topLeft',
        'topRight',
        'topStart'
      ]
    }
  }
} as Meta;

type Story = StoryObj<typeof Menu>;

export const MenuStory: Story = {
  render: (args) => {
    return (
      <MenuSurfaceAnchor
        style={{ position: 'absolute', top: '24px', left: '24px' }}
      >
        <Menu {...args} foundationRef={console.log}>
          <MenuItem>Cookies</MenuItem>
          <MenuItem>Pizza</MenuItem>
          <MenuItem>Icecream</MenuItem>
        </Menu>
      </MenuSurfaceAnchor>
    );
  },
  args: {
    open: true
  }
};

export const MenuSurfaceStory: Story = {
  render: (args) => {
    return (
      <MenuSurfaceAnchor
        style={{ position: 'absolute', top: '24px', left: '24px' }}
      >
        <MenuSurface {...args} foundationRef={console.log}>
          <MenuItem>Cookies</MenuItem>
          <MenuItem>Pizza</MenuItem>
          <MenuItem>Icecream</MenuItem>
        </MenuSurface>
      </MenuSurfaceAnchor>
    );
  },
  args: {
    open: true
  }
};

export const SimpleMenuStory: Story = {
  render: (args) => {
    return (
      <SimpleMenu handle={<Button raised>Open Simple Menu</Button>}>
        <MenuItem>Cookies</MenuItem>
        <MenuItem>Pizza</MenuItem>
        <MenuItem>Icecream</MenuItem>
      </SimpleMenu>
    );
  }
};

function MenuHoist(args: { hoisted: boolean }) {
  const { hoisted } = args;
  const [selected, setSelected] = useState(-1);
  const [open, setOpen] = React.useState(true);
  const options = ['Cookies', 'Pizza', 'Icecream'];

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
          onSelect={(evt) => setSelected(evt.detail.index)}
          onClose={() => setOpen(false)}
        >
          {options.map((o: string, index: number) => (
            <MenuItem key={o} activated={selected === index}>
              {o}
            </MenuItem>
          ))}
        </Menu>
      </MenuSurfaceAnchor>
    </div>
  );
}

export const MenuHoistToBodyStory: StoryObj<typeof MenuHoist> = {
  render: (args) => {
    const { hoisted } = args;
    return (
      <>
        <MenuHoist hoisted={hoisted} />
        <MenuHoist hoisted={hoisted} />
      </>
    );
  },
  args: {
    hoisted: true
  }
};
