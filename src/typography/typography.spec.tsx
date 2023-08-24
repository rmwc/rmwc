import React from 'react';
import { render, screen } from '@testing-library/react';
import { Typography } from './';
import { RMWCProvider } from '../provider';

describe('Typography', () => {
  it('renders', () => {
    const { asFragment } = render(<Typography use="body1" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with each type', () => {
    const { asFragment } = render(
      <>
        <Typography use="headline1" />
        <Typography use="headline2" />
        <Typography use="headline3" />
        <Typography use="headline4" />
        <Typography use="headline5" />
        <Typography use="headline6" />
        <Typography use="subtitle1" />
        <Typography use="subtitle2" />
        <Typography use="body1" />
        <Typography use="body2" />
        <Typography use="caption" />
        <Typography use="button" />
        <Typography use="button" />
      </>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('can have custom classnames', () => {
    const { container } = render(
      <Typography use="body1" className={'my-custom-classname'} />
    );
    expect(container.firstChild).toHaveClass('my-custom-classname');
  });

  it('supports refs', () => {
    const myRef = React.createRef<HTMLElement>();

    render(
      <Typography use="body1" ref={myRef}>
        Hello
      </Typography>
    );

    expect(myRef.current).toBeTruthy();
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
