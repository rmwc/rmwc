import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

export const mountHook = (hook: () => void) => {
  mount(<HookWrapper hook={hook} />);
};

function HookWrapper({ hook }: { hook: () => void }) {
  hook();
  return <></>;
}

export const wait = (timeout = 0) =>
  new Promise(resolve => {
    setTimeout(resolve, timeout);
  });

export const actWait = async (timeout = 0) => {
  await act(async () => {
    await wait(timeout);
  });
};
