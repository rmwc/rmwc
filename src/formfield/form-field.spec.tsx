import React from 'react';
import { mount } from 'enzyme';
import { FormField } from './';

describe('FormField', () => {
  test('renders', () => {
    mount(
      <FormField>
        <input type="checkbox" id="input" />
        <label htmlFor="input">Input Label</label>
      </FormField>
    );
  });
});
