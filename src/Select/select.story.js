import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object, array, boolean } from '@storybook/addon-knobs';
import { Select } from './';
import { ListItem } from '../List';
import { storyWithState } from '../Base/story-with-state';


const MutatingSelect = storyWithState(
  state => ({
    value: text('value', state.value || 'Cookies'),
    label: text('label', state.label || 'Label'),
    options: array('options', state.options || ['Cookies', 'Pizza', 'Icecream'])
  }),
  function() {
    return (
      <Select
        {...this.props}
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
      value={text('value', '')}
      placeholder={text('placeholder', 'Select a Food')}
      options={object('options', { 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' })}
      onChange={evt => action('onChange: ' + evt.target.value)()}
    />
  ))
  .add('Select with array', () => (
    <Select
      box={boolean('box', false)}
      label={text('label', 'Foods')}
      value={text('value', '')}
      placeholder={text('placeholder', 'Select a Food')}
      options={array('options', ['Cookies', 'Pizza', 'Icecream'])}
      onChange={evt => action('onChange: ' + evt.target.value)()}
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
  .add('Select with children', () => (
    <Select
      box={boolean('box', false)}
      value={text('value', 'Cookies')}
      onChange={evt => action('onChange: ' + evt.target.value)()}
    >
      <ListItem role="option" id="Cookies" tabIndex="0">
        Cookies
      </ListItem>
      <ListItem role="option" id="Pizza" tabIndex="0">
        Pizza
      </ListItem>
      <ListItem role="option" id="Icecream" tabIndex="0">
        Icecream
      </ListItem>
    </Select>
  ))
  .add('Mutating Select', () => <MutatingSelect />);
