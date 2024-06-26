import React from 'react';
import { Ripple } from './ripple'; // replace with your actual component import
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Ripple',
  component: Ripple
} as Meta;

type Story = StoryObj<typeof Ripple>;

export const RippleStory: Story = {
  render: (args) => {
    const rippleStyle = {
      width: '240px',
      height: '240px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };

    return (
      <Ripple {...args} style={rippleStyle} foundationRef={console.log}>
        <div style={rippleStyle}>Click Me</div>
      </Ripple>
    );
  },
  args: {
    primary: false,
    accent: false,
    unbounded: false
  }
};
