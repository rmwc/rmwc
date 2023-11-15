import { RMWCProvider } from '@rmwc/provider';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './tooltip';

describe('Tooltip', () => {
  it('renders', async () => {
    const { asFragment } = render(
      <Tooltip label="test" overlay="tooltip" open>
        <span>test</span>
      </Tooltip>
    );
    userEvent.hover(screen.getByText('test'));
    expect(screen.getByText('tooltip')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('activateOn', () => {
    render(
      <Tooltip overlay="tooltip" activateOn="click">
        <span>test</span>
      </Tooltip>
    );
  });

  it('className', () => {
    render(
      <Tooltip overlay="tooltip" className="my-custom-classname">
        <span>test</span>
      </Tooltip>
    );
  });

  it('enterDelay', () => {
    render(
      <Tooltip overlay="tooltip" enterDelay={1000}>
        <span>test</span>
      </Tooltip>
    );
  });

  it('leaveDelay', () => {
    render(
      <Tooltip overlay="tooltip" leaveDelay={1000}>
        <span>test</span>
      </Tooltip>
    );
  });

  it('works with provider', () => {
    render(
      <RMWCProvider tooltip={{}}>
        <Tooltip overlay="tooltip">
          <span>test</span>
        </Tooltip>
      </RMWCProvider>
    );
  });

  it('can be rich', () => {
    const { asFragment } = render(
      <RMWCProvider tooltip={{}}>
        {
          <Tooltip label="test" overlay={<div>tooltip</div>}>
            <span>test</span>
          </Tooltip>
        }
      </RMWCProvider>
    );

    expect(screen.getByText('test').parentElement).toHaveClass(
      'mdc-tooltip-wrapper--rich'
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('can be rich with default rich styling disabled', () => {
    const { asFragment } = render(
      <Tooltip label="test" overlay={<div>tooltip</div>} disableRichStyling>
        <span>test</span>
      </Tooltip>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('can be rich and persistent', () => {
    const { asFragment } = render(
      <RMWCProvider tooltip={{}}>
        {
          <Tooltip label="test" overlay={<div>tooltip</div>} isPersistent>
            <span>test</span>
          </Tooltip>
        }
      </RMWCProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('accepts allowed align value from provider context', () => {
    vi.spyOn(console, 'warn');
    render(
      <RMWCProvider tooltip={{ align: 'start' }}>
        {
          <Tooltip label="test">
            <span>test</span>
          </Tooltip>
        }
      </RMWCProvider>
    );
    expect(console.warn).not.toBeCalled();
  });

  it('warn against wrong align value from provider context', () => {
    vi.spyOn(console, 'warn');
    render(
      <RMWCProvider tooltip={{ align: 'bottom' }}>
        {
          <Tooltip label="test">
            <span>test</span>
          </Tooltip>
        }
      </RMWCProvider>
    );
    expect(console.warn).toBeCalled();
  });
});
