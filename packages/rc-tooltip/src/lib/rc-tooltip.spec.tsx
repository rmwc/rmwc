import { RMWCProvider } from '@rmwc/provider';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RCTooltip } from './rc-tooltip';

describe('Tooltip', () => {
  it('renders', async () => {
    const { asFragment } = render(
      <RCTooltip content="tooltip">
        <span>test</span>
      </RCTooltip>
    );
    await userEvent.hover(screen.getByText('test'));
    expect(screen.getByText('tooltip')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('activateOn', () => {
    render(
      <RCTooltip content="tooltip" activateOn="click">
        <span>test</span>
      </RCTooltip>
    );
  });

  it('showArrow', () => {
    const { asFragment } = render(
      <RCTooltip content="tooltip" showArrow>
        <span>test</span>
      </RCTooltip>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('className', () => {
    render(
      <RCTooltip content="tooltip" className="my-custom-classname">
        <span>test</span>
      </RCTooltip>
    );
  });

  it('enterDelay', () => {
    render(
      <RCTooltip content="tooltip" enterDelay={1000}>
        <span>test</span>
      </RCTooltip>
    );
  });

  it('leaveDelay', () => {
    render(
      <RCTooltip content="tooltip" leaveDelay={1000}>
        <span>test</span>
      </RCTooltip>
    );
  });

  it('align', () => {
    const { asFragment } = render(
      <RCTooltip content="tooltip" align="bottom">
        <span>test</span>
      </RCTooltip>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('works with provider', () => {
    render(
      <RMWCProvider tooltip={{}}>
        <RCTooltip content="tooltip">
          <span>test</span>
        </RCTooltip>
      </RMWCProvider>
    );
  });

  it('accepts allowed align value from provider context', () => {
    vi.spyOn(console, 'warn');
    render(
      <RMWCProvider tooltip={{ align: 'bottom' }}>
        <RCTooltip content="tooltip">
          <span>test</span>
        </RCTooltip>
      </RMWCProvider>
    );
    expect(console.warn).not.toBeCalled();
  });

  it('warn against wrong align value from provider context', () => {
    vi.spyOn(console, 'warn');
    render(
      <RMWCProvider tooltip={{ align: 'start' }}>
        <RCTooltip content="tooltip">
          <span>test</span>
        </RCTooltip>
      </RMWCProvider>
    );
    expect(console.warn).toBeCalled();
  });
});
