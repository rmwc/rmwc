import React from 'react';
import { mount } from 'enzyme';
import { Tooltip } from './';
import { RMWCProvider } from '../provider';

describe('Tooltip', () => {
  it('renders', () => {
    mount(
      <Tooltip content="tooltip">
        <span>test</span>
      </Tooltip>
    );
  });

  it('activateOn', () => {
    mount(
      <Tooltip content="tooltip" activateOn="click">
        <span>test</span>
      </Tooltip>
    );
  });

  it('showArrow', () => {
    mount(
      <Tooltip content="tooltip" showArrow>
        <span>test</span>
      </Tooltip>
    );
  });

  it('className', () => {
    mount(
      <Tooltip content="tooltip" className="foo">
        <span>test</span>
      </Tooltip>
    );
  });

  it('enterDelay', () => {
    mount(
      <Tooltip content="tooltip" enterDelay={1000}>
        <span>test</span>
      </Tooltip>
    );
  });

  it('leaveDelay', () => {
    mount(
      <Tooltip content="tooltip" leaveDelay={1000}>
        <span>test</span>
      </Tooltip>
    );
  });

  it('align', () => {
    mount(
      <Tooltip content="tooltip" align="bottom">
        <span>test</span>
      </Tooltip>
    );
  });

  it('works with provider', () => {
    mount(
      <RMWCProvider tooltip={{}}>
        <Tooltip content="tooltip">
          <span>test</span>
        </Tooltip>
      </RMWCProvider>
    );
  });
});
