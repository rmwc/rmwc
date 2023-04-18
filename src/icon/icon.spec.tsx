import React from 'react';
import { render, screen } from '@testing-library/react';
import { Icon } from './';

describe('Icon', () => {
  it('renders ligature', () => {
    const { asFragment } = render(<Icon icon="favorite" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders Url', () => {
    const { asFragment } = render(<Icon icon="images/icons/twitter.png" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('can have custom classnames', () => {
    const { container } = render(<Icon className={'my-custom-classname'} />);
    expect(container.firstChild).toHaveClass('my-custom-classname');
  });

  it('renders with JSX', () => {
    const { asFragment } = render(
      <Icon
        icon={
          <div
            style={{ background: 'purple', width: '24px', height: '24px' }}
          />
        }
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders svg', () => {
    const { asFragment } = render(
      <Icon
        icon={
          <svg>
            <path />
          </svg>
        }
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders nested Icons', () => {
    render(<Icon icon={<Icon icon={<div>Hello World</div>} />} />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('can be sizes', () => {
    const sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];

    sizes.forEach((size: any) => {
      const { container } = render(<Icon icon={{ icon: 'favorite', size }} />);
      expect(container.firstChild).toHaveClass(`rmwc-icon--size-${size}`);
    });
  });

  it('renders className', () => {
    const { asFragment } = render(
      <Icon
        icon={{
          icon: 'ionic',
          prefix: 'ion-',
          strategy: 'className',
          basename: 'icon'
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Errors when bad strategy is passed', () => {
    jest.spyOn(console, 'error');
    render(
      <Icon
        icon={{
          icon: 'foo',
          // @ts-ignore
          strategy: 'error'
        }}
      />
    );
    expect(console.error).toHaveBeenCalled();
  });

  it('renders custom', () => {
    const { asFragment } = render(
      <Icon
        icon={{
          icon: 'CUSTOM',
          strategy: 'custom',
          render: (props) => (
            <div>
              Customized-
              {props.content}
            </div>
          )
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('does not crash when custom render returns a string', () => {
    const { asFragment } = render(
      <Icon
        icon={{
          icon: 'CUSTOM',
          strategy: 'custom',
          render: () => 'custom'
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
