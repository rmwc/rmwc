import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { Radio } from './';
import { storyWithState } from '@rmwc/base/utils/story-with-state';

const RadioStory = storyWithState(
  state => ({
    checked: boolean('checked', state.checked || false),
    disabled: boolean('disabled', state.disabled || false),
    value: text('value', state.value || 'myValue'),
    label: text('label', state.label || 'Hello World')
  }),
  function() {
    return (
      <Radio
        disabled={this.state.disabled}
        checked={this.state.checked}
        value={this.state.value}
        onChange={evt => {
          this.setState({ checked: evt.target.checked });
          action(`onChange: ${evt.target.value} ${evt.target.checked}`)();
        }}
        label={this.state.label}
      />
    );
  }
);

storiesOf('Inputs and Controls', module).add('Radio', () => <RadioStory />);
