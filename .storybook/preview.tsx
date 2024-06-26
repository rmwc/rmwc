import React from 'react';
import 'rmwc/styles';
import { Portal } from '@rmwc/base';

import { Preview } from '@storybook/react';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div
        className="mdc-typography"
        style={{ padding: '24px', height: '100%' }}
      >
        <style>{`
    body {
      margin: 0;
    }
    `}</style>
        <Story />
      </div>
    ),
    (Story) => (
      <>
        <Story />
        <Portal />
      </>
    )
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

export default preview;
