import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, number } from '@storybook/addon-knobs';
import { TextField } from './';

class TextFieldStory extends React.Component {
  state = {
    value: ''
  };

  onChange(evt) {
    this.setState({ value: evt.target.value });
    action('Value: ' + evt.target.value)();
  }

  render() {
    return (
      <TextField
        label={text('label', 'Hello world')}
        value={text('value', this.state.value)}
        disabled={boolean('disabled', false)}
        dense={boolean('dense', false)}
        required={boolean('required', false)}
        box={boolean('box', false)}
        outlined={boolean('outlined', false)}
        onChange={evt => this.onChange(evt)}
        rows={number('rows', 8)}
        cols={number('cols', 0)}
        withLeadingIcon={text('withLeadingIcon', '')}
        withTrailingIcon={text('withTrailingIcon', '')}
        textarea={boolean('textarea', false)}
      />
    );
  }
}

storiesOf('Inputs and Controls', module).add('TextField', () => (
  <TextFieldStory />
));
