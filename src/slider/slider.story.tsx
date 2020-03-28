import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Slider } from './';
import { useKnob } from '@rmwc/base/utils/use-knob';

function SliderStory() {
  const [value, setValue] = useKnob('number', 'value', 0);
  const [min] = useKnob('number', 'min', 0);
  const [max] = useKnob('number', 'max', 100);
  const [step] = useKnob('number', 'step', 0);
  const [discrete] = useKnob('boolean', 'discrete', false);
  const [displayMarkers] = useKnob('boolean', 'displayMarkers', false);
  const [disabled] = useKnob('boolean', 'disabled', false);

  return (
    <Slider
      value={value}
      min={min}
      max={max}
      step={step}
      foundationRef={console.log}
      discrete={discrete}
      displayMarkers={displayMarkers}
      disabled={disabled}
      onChange={evt => {
        setValue(evt.detail.value);
        action('onChange')(evt);
      }}
      onInput={evt => {
        setValue(evt.detail.value);
        action('onInput')(evt);
      }}
    />
  );
}

storiesOf('Inputs and Controls', module)
  .add('Slider', () => (
    <Slider onChange={action('onChange')} onInput={action('onInput')} />
  ))
  .add('Slider Controlled', () => <SliderStory />);
