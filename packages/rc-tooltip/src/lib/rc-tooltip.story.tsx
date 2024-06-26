import React from 'react';
import { Avatar } from '@rmwc/avatar';
import { RCTooltip } from './rc-tooltip'; // replace with your actual component import
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Tooltips/RCTooltips',
  component: RCTooltip
} as Meta;

type Story = StoryObj<typeof RCTooltip>;

export const RCTooltipStory: Story = {
  render: (args) => (
    <RCTooltip {...args}>
      <a href="#" style={{ margin: '4rem', display: 'inline-block' }}>
        hover
      </a>
    </RCTooltip>
  ),
  args: {
    content: 'Test Tooltip'
  }
};

export const RCTooltipRichContentStory: Story = {
  render: (args) => (
    <RCTooltip {...args}>
      <a href="#" style={{ margin: '4rem', display: 'inline-block' }}>
        Rich Content
      </a>
    </RCTooltip>
  ),
  args: {
    content: (
      <div>
        <Avatar size="xsmall" name="James Friedman" /> James Friedman
      </div>
    )
  }
};
