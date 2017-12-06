import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, object, array, number } from '@storybook/addon-knobs';
import { Select } from './';
import { ListItem } from '../List';

storiesOf('Selects', module)
  .add('Select with object', () => (
    <Select
      value={text('value', '')}
      placeholder={text('placeholder', 'Select a Food')}
      options={object('options', { 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' })}
      onChange={evt => action('onChange: ' + evt.target.value)()}
    />
  ))
  .add('Select with array', () => (
    <Select
      value={text('value', '')}
      placeholder={text('placeholder', 'Select a Food')}
      options={array('options', ['Cookies', 'Pizza', 'Icecream'])}
      onChange={evt => action('onChange: ' + evt.target.value)()}
    />
  ))
  .add('Select with initial value', () => (
    <Select
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
  ));
