import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, number } from '@storybook/addon-knobs';
import { Slider } from './';

import { storyWithState } from '../Base/story-with-state';

const SliderStory = storyWithState(
  state => ({
    value: number('value', state.value || 0),
    min: number('min', state.min || 0),
    max: number('max', state.max || 100),
    step: number('step', state.step || 0),
    discrete: boolean('discrete', state.discrete || false),
    displayMarkers: boolean('displayMarkers', state.displayMarkers || false),
    disabled: boolean('disabled', state.disabled || false)
  }),
  function() {
    return (
      <Slider
        value={this.state.value}
        min={this.state.min}
        max={this.state.max}
        step={this.state.step}
        discrete={this.state.discrete}
        displayMarkers={this.state.displayMarkers}
        disabled={this.state.disabled}
        onChange={evt => {
          this.setState({ value: evt.detail.value });
          action('onChange')(evt);
        }}
        onInput={evt => {
          this.setState({ value: evt.detail.value });
          action('onInput')(evt);
        }}
      />
    );
  }
);

storiesOf('Inputs and Controls', module)
  .add('Slider', () => (
    <Slider onChange={action('onChange')} onInput={action('onInput')} />
  ))
  .add('Slider Controlled', () => <SliderStory />);
