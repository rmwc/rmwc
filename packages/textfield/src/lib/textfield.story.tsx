import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TextField } from './textfield'; // replace with your actual component import

export default {
  title: 'Inputs and Controls/TextField',
  component: TextField
} as Meta;

type Story = StoryObj<Parameters<typeof TextField>[0]>;

export const TextFieldStory: Story = {
  render: (args) => <TextField {...args} />,
  args: {
    label: 'Hello world',
    value: '',
    disabled: false,
    required: false,
    outlined: false,
    invalid: false,
    rows: 8,
    cols: 0,
    withLeadingIcon: '',
    withTrailingIcon: '',
    textarea: false,
    prefix: '',
    suffix: ''
  }
};

class TextFieldUncontrolled extends React.Component {
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

export const TextFieldUncontrolledStory: Story = {
  render: () => <TextFieldUncontrolled />
};

export const TextFieldAutofocusStory: Story = {
  render: () => <TextField label="Hello" autoFocus />
};

export const TextFieldCharacterCountStory: Story = {
  render: () => (
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
  )
};

export const TextFieldChangingStory: Story = {
  render: () => {
    const Component = () => {
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
    };
    return <Component />;
  }
};
