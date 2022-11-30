import React from 'react';

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
      required={boolean('required', false)}
      outlined={boolean('outlined', false)}
      invalid={boolean('invalid', false)}
      onChange={(evt) => setValue(evt.currentTarget.value)}
      rows={number('rows', 8)}
      cols={number('cols', 0)}
      icon={text('withLeadingIcon', '')}
      trailingIcon={text('withTrailingIcon', '')}
      textarea={boolean('textarea', false)}
      prefix={text('prefix', '')}
      suffix={text('suffix', '')}
      foundationRef={console.log}
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
  .add('autoFocus', () => <TextField label="Hello" autoFocus />)
  .add('Character Count', () => (
    <>
      <TextField
        textarea
        label="textarea..."
        rows={8}
        maxLength={20}
        characterCount
        resizeable
        helpText={{
          persistent: true,
          validationMsg: true,
          children: 'The field is required'
        }}
      />

      <TextField label="Textfield" rows={8} maxLength={20} characterCount />
    </>
  ))
  .add('Changing', function () {
    const [value, setValue] = React.useState('');

    React.useEffect(() => {
      setInterval(() => {
        setValue((val) => (val === '' ? 'Hello World' : ''));
      }, 2000);
    }, []);

    return (
      <TextField
        label="Controlled"
        value={value}
        outlined
        onChange={() => {}}
      />
    );
  });
