import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object, array } from '@storybook/addon-knobs';
import { Select } from './';
import { ListItem } from '../List';
import { storyWithState } from '../Base/story-with-state';

const CSSSelectStory = storyWithState(
  state => ({
    label: text('label', state.label || 'Foods'),
    value: text('value', state.value || 'Cookies'),
    options: array('options', state.options || ['Cookies', 'Pizza', 'Icecream'])
  }),
  function() {
    return (
      <Select
        cssOnly
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

const CSSSelectWithOptgroupsStory = storyWithState(
  state => ({
    label: text('label', state.label || 'Foods'),
    value: text('value', state.value || 'Cookies'),
    options: array(
      'options',
      state.options || [
        { label: 'Foods', options: ['Cookies', 'Pizza', 'Icecream'] },
        { label: 'Animals', options: ['Dogs', 'Cats', 'Birds'] }
      ]
    )
  }),
  function() {
    return (
      <Select
        {...this.props}
        cssOnly
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
      label={text('label', 'Foods')}
      value={text('value', '')}
      placeholder={text('placeholder', 'Select a Food')}
      options={object('options', { 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' })}
      onChange={evt => action('onChange: ' + evt.target.value)()}
    />
  ))
  .add('Select with array', () => (
    <Select
      label={text('label', 'Foods')}
      value={text('value', '')}
      placeholder={text('placeholder', 'Select a Food')}
      options={array('options', ['Cookies', 'Pizza', 'Icecream'])}
      onChange={evt => action('onChange: ' + evt.target.value)()}
    />
  ))
  .add('Select with initial value', () => (
    <Select
      label={text('label', 'Foods')}
      value={text('value', 'Cookies')}
      options={array('options', ['Cookies', 'Pizza', 'Icecream'])}
      onChange={evt => action('onChange: ' + evt.target.value)()}
    />
  ))
  .add('Select with children', () => (
    <Select
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
  .add('CSS Select', () => <CSSSelectStory />)
  .add('CSS Select w/ optgroups', () => <CSSSelectWithOptgroupsStory />);
