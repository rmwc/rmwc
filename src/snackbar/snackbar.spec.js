import * as React from 'react';
import { mount } from 'enzyme';
import { Snackbar } from './';

describe('Snackbar', () => {
  it('renders', () => {
    const el = mount(
      <Snackbar
        show
        onHide={evt => {}}
        message="This is a new message"
        actionText="Action"
        actionHandler={() => alert('Action clicked')}
      />
    );
    expect(!!~el.html().search('mdc-snackbar')).toBe(true);
  });

  it('can be alignStart', () => {
    const el = mount(
      <Snackbar
        show
        onHide={evt => {}}
        message="This is a new message"
        actionText="Action"
        actionHandler={() => alert('Action clicked')}
        alignStart
      />
    );
    expect(!!~el.html().search('mdc-snackbar--align-start')).toBe(true);
  });
});
