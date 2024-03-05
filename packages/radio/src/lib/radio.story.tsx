import React, { useState } from 'react';
import { Radio } from './radio'; // replace with your actual component import
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Inputs and Controls/Radio',
  component: Radio
} as Meta;

type Story = StoryObj<typeof Radio>;

export const RadioStory: Story = {
  render: (args) => {
    const Component = () => {
      const [checked, setChecked] = useState(false);

      return (
        <Radio
          {...args}
          checked={checked}
          foundationRef={console.log}
          onChange={(evt) => {
            setChecked(evt.currentTarget.checked);
          }}
        />
      );
    };
    return <Component />;
  },
  args: {
    disabled: false,
    value: 'myValue',
    label: 'Hello World'
  }
};
