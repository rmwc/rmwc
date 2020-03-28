import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Checkbox } from './';
import { useKnob } from '@rmwc/base/utils/use-knob';

function CheckboxStory() {
  const [checked, setChecked] = useKnob('boolean', 'checked', false);
  const [indeterminate] = useKnob('boolean', 'indeterminate', false);
  const [disabled] = useKnob('boolean', 'disabled', false);
  const [value] = useKnob('text', 'value', 'myValue');
  const [label] = useKnob('text', 'label', 'Hello World');

  return (
    <Checkbox
      disabled={disabled}
      checked={checked}
      indeterminate={indeterminate}
      value={value}
      foundationRef={ref => console.log(ref)}
      onChange={evt => {
        setChecked(evt.currentTarget.checked);
        action(
          `onChange: ${evt.currentTarget.value} ${evt.currentTarget.checked}`
        )();
      }}
      label={label}
    />
  );
}

storiesOf('Inputs and Controls', module).add('Checkbox', () => (
  <CheckboxStory />
));
