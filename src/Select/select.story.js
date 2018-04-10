import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object, array, boolean } from '@storybook/addon-knobs';
import { Select } from './';
import { storyWithState } from '../Base/utils/story-with-state';

const MutatingSelect = storyWithState(
  state => ({
    value: text('value', state.value || 'Cookies'),
    label: text('label', state.label || 'Label'),
    options: array(
      'options',
      state.options || ['Cookies', 'Pizza', 'Icecream']
    ),
    disabled: boolean('disabled', state.disabled || false)
  }),
  function() {
    return (
      <Select
        {...this.props}
        disabled={this.state.disabled}
        label={this.state.label}
        value={this.state.value}
        options={this.state.options}
        onChange={evt => {
          this.setState({ value: evt.target.value });
          action('onChange: ' + evt.target.value)();
        }}
      />
    );
  }
);

storiesOf('Inputs and Controls', module)
  .add('Select with object', () => (
    <Select
      box={boolean('box', true)}
      label={text('label', 'Foods')}
      placeholder={text('placeholder', 'Select a Food')}
      options={object('options', { 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' })}
    />
  ))
  .add('Select with array', () => (
    <Select
      box={boolean('box', false)}
      label={text('label', 'Foods')}
      placeholder={text('placeholder', 'Select a Food')}
      options={array('options', ['Cookies', 'Pizza', 'Icecream'])}
    />
  ))
  .add('Select with initial value', () => (
    <Select
      box={boolean('box', false)}
      label={text('label', 'Foods')}
      value={text('value', 'Cookies')}
      options={array('options', ['Cookies', 'Pizza', 'Icecream'])}
      onChange={evt => action('onChange: ' + evt.target.value)()}
    />
  ))
  .add('Select with many values', () => (
    <Select
      box={boolean('box', false)}
      options={[...Array(100)].map(() => Math.random().toString(16))}
    />
  ))
  .add('Select with children', () => (
    <Select box={boolean('box', false)}>
      <option value="Cookies">Cookies</option>
      <option value="Pizza">Pizza</option>
      <option value="Icecream">Icecream</option>
    </Select>
  ))
  .add('Mutating Select', () => <MutatingSelect />);
