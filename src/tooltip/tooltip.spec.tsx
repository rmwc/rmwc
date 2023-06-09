import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './';
import { RMWCProvider } from '../provider';

describe('Tooltip', () => {
  it('renders', async () => {
    const { asFragment } = render(
      <Tooltip content="tooltip" open>
        <span>test</span>
      </Tooltip>
    );
    userEvent.hover(screen.getByText('test'));
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

  it('can display arrow', () => {
    const { asFragment } = render(
      <RMWCProvider tooltip={{}}>
        <Tooltip content="tooltip" showArrow>
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
          // @ts-ignore
          <Tooltip content={<div>tooltip</div>}>
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
          // @ts-ignore
          <Tooltip content={<div>tooltip</div>} isPersistent>
            <span>test</span>
          </Tooltip>
        }
      </RMWCProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
