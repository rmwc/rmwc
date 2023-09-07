/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { FormField } from './form-field';

describe('FormField SSR', () => {
  test('renders', () => {
    mount(
      <FormField>
        <input type="checkbox" id="input" />
        <label htmlFor="input">Input Label</label>
      </FormField>
    );
  });
});
