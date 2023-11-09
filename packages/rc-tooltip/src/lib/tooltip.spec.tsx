import { RMWCProvider } from '@rmwc/provider';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './tooltip';

describe('Tooltip', () => {
  it('renders', async () => {
    const { asFragment } = render(
      <Tooltip content="tooltip">
        <span>test</span>
      </Tooltip>
    );
    await userEvent.hover(screen.getByText('test'));
    expect(screen.getByText('tooltip')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('activateOn', () => {
    render(
      <Tooltip content="tooltip" activateOn="click">
        <span>test</span>
      </Tooltip>
    );
  });

  it('showArrow', () => {
    const { asFragment } = render(
      <Tooltip content="tooltip" showArrow>
        <span>test</span>
      </Tooltip>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('className', () => {
    render(
      <Tooltip content="tooltip" className="my-custom-classname">
        <span>test</span>
      </Tooltip>
    );
  });

  it('enterDelay', () => {
    render(
      <Tooltip content="tooltip" enterDelay={1000}>
        <span>test</span>
      </Tooltip>
    );
  });

  it('leaveDelay', () => {
    render(
      <Tooltip content="tooltip" leaveDelay={1000}>
        <span>test</span>
      </Tooltip>
    );
  });

  it('align', () => {
    const { asFragment } = render(
      <Tooltip content="tooltip" align="bottom">
        <span>test</span>
      </Tooltip>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('works with provider', () => {
    render(
      <RMWCProvider tooltip={{}}>
        <Tooltip content="tooltip">
          <span>test</span>
        </Tooltip>
      </RMWCProvider>
    );
  });
});
