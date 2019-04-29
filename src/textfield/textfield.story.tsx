import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, text, number } from '@storybook/addon-knobs';
import { TextField } from './';

function TextFieldStory() {
  const [value, setValue] = React.useState('');

  return (
    <TextField
      pattern="[A-Za-z]{3}"
      label={text('label', 'Hello world')}
      value={text('value', value)}
      disabled={boolean('disabled', false)}
      dense={boolean('dense', false)}
      required={boolean('required', false)}
      outlined={boolean('outlined', false)}
      invalid={boolean('invalid', false)}
      onChange={evt => setValue(evt.currentTarget.value)}
      rows={number('rows', 8)}
      cols={number('cols', 0)}
      icon={text('withLeadingIcon', '')}
      trailingIcon={text('withTrailingIcon', '')}
      textarea={boolean('textarea', false)}
    />
  );
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

storiesOf('TextField', module)
  .add('TextField (Controlled)', () => <TextFieldStory />)
  .add('TextField (Uncontrolled)', () => <TextFieldUncontrolledStory />)
  .add('autoFocus', () => <TextField label="Hello" autoFocus />);
