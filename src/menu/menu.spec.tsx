import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  MenuSurfaceAnchor,
  Menu,
  MenuSurface,
  MenuItem,
  SimpleMenu,
  SimpleMenuSurface
} from './';

describe('Menu', () => {
  it('renders', () => {
    const { asFragment } = render(
      <Menu open onClose={() => {}}>
        <MenuItem>Cookies</MenuItem>
        <MenuItem>Pizza</MenuItem>
        <MenuItem>Icecream</MenuItem>
      </Menu>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('can be fixed', async () => {
    render(
      <MenuSurfaceAnchor>
        <Menu open fixed>
          <MenuItem>Cookies</MenuItem>
          <MenuItem>Pizza</MenuItem>
          <MenuItem>Icecream</MenuItem>
        </Menu>
      </MenuSurfaceAnchor>
    );

    expect(screen.getByRole('menu').parentElement).toHaveClass(
      'mdc-menu-surface--fixed'
    );
  });

  it('dynamically updates aria-hidden based on whether or not the menu is open', () => {
    const { container, rerender } = render(<Menu open />);

    expect(container.firstChild).toHaveAttribute('aria-hidden', 'false');

    rerender(<Menu />);

    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('MenuSurface renders', () => {
    const { asFragment } = render(
      <MenuSurfaceAnchor>
        <button>Test</button>

        <MenuSurface open onClose={() => {}}>
          <MenuItem>Cookies</MenuItem>
          <MenuItem>Pizza</MenuItem>
          <MenuItem>Icecream</MenuItem>
        </MenuSurface>
      </MenuSurfaceAnchor>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('SimpleMenu renders', async () => {
    let val = 0;

    const { asFragment } = render(
      <SimpleMenu handle={<button>Test</button>} open onClose={() => val++}>
        <MenuItem>Cookies</MenuItem>
        <MenuItem>Pizza</MenuItem>
        <MenuItem>Icecream</MenuItem>
      </SimpleMenu>
    );

    userEvent.click(screen.getByText('Test'));

    await waitFor(() => {
      expect(val).toBe(1);
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('Menu Item can be nested', () => {
    let val = null;

    const { asFragment } = render(
      <SimpleMenu
        handle={<button>Test</button>}
        open
        onSelect={(evt) => (val = evt.detail.index)}
      >
        <MenuItem>
          <span>Cookies</span>
        </MenuItem>
        <MenuItem>
          <span>Pizza</span>
        </MenuItem>
        <MenuItem>
          <span>Icecream</span>
        </MenuItem>
      </SimpleMenu>
    );

    userEvent.click(screen.getByText('Test'));

    expect(asFragment()).toMatchSnapshot();
  });

  it('SimpleMenuSurface renders', async () => {
    let val = 0;

    const { asFragment } = render(
      <SimpleMenuSurface
        handle={<button onClick={() => {}}>Test</button>}
        open
        onClose={() => {
          val++;
        }}
      >
        <div>Hello</div>
      </SimpleMenuSurface>
    );

    userEvent.click(screen.getByText('Test'));

    await waitFor(() => expect(val).toBe(1));

    expect(asFragment()).toMatchSnapshot();
  });

  it('can have custom classnames', () => {
    [MenuSurfaceAnchor, Menu, MenuItem].forEach(
      (Component: React.ComponentType<any>) => {
        const { container } = render(
          <Component className={'my-custom-classname'} />
        );
        expect(container.firstChild).toHaveClass('my-custom-classname');
      }
    );
  });
});
