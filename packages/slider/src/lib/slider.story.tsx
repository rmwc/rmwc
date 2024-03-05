import React from 'react';
import { Slider } from './slider';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Inputs and Controls/Slider',
  component: Slider
} as Meta;

type Story = StoryObj<typeof Slider>;

export const SliderStory: Story = {
  render: (args) => (
    <Slider onChange={action('onChange')} onInput={action('onInput')} />
  )
};

export const SliderControlledStory: Story = {
  render: (args) => {
    return (
      <Slider
        {...args}
        onChange={(evt) => {
          action('onChange')(evt);
        }}
        onInput={(evt) => {
          action('onInput')(evt);
        }}
      />
    );
  },
  args: {
    value: 50,
    min: 0,
    max: 100,
    step: 5,
    discrete: true,
    displayMarkers: true
  }
};
