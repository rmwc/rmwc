// @ts-ignore
import '@testing-library/jest-dom';
import { beforeAll, vi } from 'vitest';
import rmwcTestPolyfill from './packages/base/src/lib/test-polyfill';

export const setup = () => {
  rmwcTestPolyfill();

  const consoleError = console.error;
  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation((...args) => {
      if (
        !(
          typeof args[0] === 'string' &&
          args[0].includes(
            'Warning: An update to %s inside a test was not wrapped in act'
          )
        )
      ) {
        consoleError(...args);
      }
    });
  });
};
