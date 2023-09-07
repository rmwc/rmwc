import { RMWCProvider } from '@rmwc/provider';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './tooltip';

describe('Tooltip', () => {
  it('renders', async () => {
    const { asFragment } = render(
      <Tooltip overlay="tooltip" open>
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

  it('can display arrow', () => {
    const { asFragment } = render(
      <RMWCProvider tooltip={{}}>
        <Tooltip overlay="tooltip" showArrow>
          <span>test</span>
        </Tooltip>
      </RMWCProvider>
    );

    expect(screen.getByText('tooltip').parentElement).toHaveClass(
      'rmwc-tooltip--show-arrow'
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('can be rich', () => {
    const { asFragment } = render(
      <RMWCProvider tooltip={{}}>
        {
          <Tooltip overlay={<div>tooltip</div>}>
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

  it('can be rich and persistent', () => {
    const { asFragment } = render(
      <RMWCProvider tooltip={{}}>
        {
          <Tooltip overlay={<div>tooltip</div>} isPersistent>
            <span>test</span>
          </Tooltip>
        }
      </RMWCProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
