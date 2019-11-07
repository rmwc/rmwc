import React from 'react';
import { mount } from 'enzyme';

export const mountHook = (hook: () => void) => {
  mount(<HookWrapper hook={hook} />);
};

function HookWrapper({ hook }: { hook: () => void }) {
  hook();
  return <></>;
}
