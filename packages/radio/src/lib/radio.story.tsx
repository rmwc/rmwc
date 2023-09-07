import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Radio } from './radio';
import { useKnob } from '@rmwc/base/utils/use-knob';

function RadioStory() {
  const [checked, setChecked] = useKnob('boolean', 'checked', false);
  const [disabled] = useKnob('boolean', 'disabled', false);
  const [value] = useKnob('text', 'value', 'myValue');
  const [label] = useKnob('text', 'label', 'Hello World');

  return (
    <Radio
      disabled={disabled}
      checked={checked}
      value={value}
      foundationRef={console.log}
      onChange={(evt) => {
        setChecked(evt.currentTarget.checked);
        action(
          `onChange: ${evt.currentTarget.value} ${evt.currentTarget.checked}`
        )();
      }}
      label={label}
    />
  );
}

storiesOf('Inputs and Controls', module).add('Radio', () => <RadioStory />);
