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
        pattern="[A-Za-z]{3}"
        label={text('label', 'Hello world')}
        value={text('value', this.state.value)}
        disabled={boolean('disabled', false)}
        dense={boolean('dense', false)}
        required={boolean('required', false)}
        box={boolean('box', false)}
        outlined={boolean('outlined', false)}
        invalid={boolean('invalid', undefined)}
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

class TextFieldUncontrolledStory extends React.Component {
  state = {
    counter: 0
  };
  render() {
    return (
      <div>
        <TextField label="Hello" />
        <button
          onClick={() => this.setState({ counter: this.state.counter + 1 })}
        >
          Force Re-render {this.state.counter}
        </button>
      </div>
    );
  }
}

storiesOf('Inputs and Controls', module)
  .add('TextField (Controlled)', () => <TextFieldStory />)
  .add('TextField (Uncontrolled)', () => <TextFieldUncontrolledStory />);
