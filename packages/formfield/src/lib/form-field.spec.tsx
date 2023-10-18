import { render, screen } from '@testing-library/react';
import React from 'react';
import { FormField } from './form-field';

describe('FormField', () => {
  it('renders', () => {
    const { asFragment } = render(
      <FormField>
        <input type="checkbox" id="input" />
        <label htmlFor="input">Input Label</label>
      </FormField>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders with alignEnd', () => {
    const { asFragment } = render(
      <FormField alignEnd>
        <input type="checkbox" id="input" />
        <label htmlFor="input">Input Label</label>
      </FormField>
    );
    expect(screen.getByText('Input Label').parentElement).toHaveClass(
      'mdc-form-field--align-end'
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders with noWrap', () => {
    const { asFragment } = render(
      <FormField noWrap>
        <input type="checkbox" id="input" />
        <label htmlFor="input">Input Label</label>
      </FormField>
    );
    expect(screen.getByText('Input Label').parentElement).toHaveClass(
      'mdc-form-field--nowrap'
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders with spaceBetween', () => {
    const { asFragment } = render(
      <FormField spaceBetween>
        <input type="checkbox" id="input" />
        <label htmlFor="input">Input Label</label>
      </FormField>
    );
    expect(screen.getByText('Input Label').parentElement).toHaveClass(
      'mdc-form-field--space-between'
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
