import React from 'react';
import { render, screen } from '@testing-library/react';
import { Typography } from './';
import { RMWCProvider } from '../provider';

describe('Typography', () => {
  it('renders', () => {
    const { asFragment } = render(<Typography use="body1" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('can have custom classnames', () => {
    const { container } = render(
      <Typography use="body1" className={'my-custom-classname'} />
    );
    expect(container.firstChild).toHaveClass('my-custom-classname');
  });

  it('supports refs', () => {
    let myRef = null;
    render(
      <Typography
        use="body1"
        ref={(el) => {
          myRef = el;
        }}
      >
        Hello
      </Typography>
    );

    expect(myRef).toBeTruthy();
  });

  it('works with RMWCProvider', () => {
    render(
      <RMWCProvider
        typography={{
          /** Make all Typography components default to <div>  */
          defaultTag: 'div',
          /** Make headline5 <h5>  */
          headline5: 'h5',
          /** Make body2 <p>  */
          body2: 'p',
          /** Use your own component  */
          body1: ({ children, ...rest }) => (
            <span>
              <b>{children}!!!</b>
            </span>
          )
        }}
      >
        <Typography use="headline6">Rendered default `div`</Typography>
        <Typography use="headline5">Rendered with `h5`</Typography>
        <Typography use="body2">Rendered with `p`</Typography>
        <Typography use="body1">Custom rendering</Typography>
      </RMWCProvider>
    );

    render(
      <RMWCProvider typography={undefined}>
        <Typography use="headline6">Rendered default `div` 2</Typography>
      </RMWCProvider>
    );
    expect(screen.getByText('Rendered default `div`')).toBeInTheDocument();
    expect(screen.getByText('Rendered with `p`')).toBeInTheDocument();
    expect(screen.getByText('Rendered default `div` 2')).toBeInTheDocument();
  });
});
