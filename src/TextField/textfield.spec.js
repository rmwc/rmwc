import React from 'react';
import { mount } from 'enzyme';
import { TextField } from './';

describe('TextField', () => {
  it('renders', () => {
    mount(<TextField placeholder="test" />);
  });

  it('can have children', () => {
    mount(
      <TextField placeholder="test">
        <div>Child</div>
      </TextField>
    );
  });

  it('can have custom classnames', () => {
    const el = mount(
      <TextField placeholder="test" className="my-custom-classname">
        <div>Child</div>
      </TextField>
    );

    const html = el.html();
    expect(
      !!~html.search('mdc-text-field') && !!~html.search('my-custom-classname')
    ).toEqual(true);
  });

  it('can be bound', () => {
    const el = mount(
      <TextField placeholder="test" value="hello world" onChange={evt => {}} />
    );
    expect(el.find('input').getDOMNode().value).toBe('hello world');
  });

  it('can be textarea', () => {
    const el = mount(
      <TextField
        placeholder="test"
        value="hello world"
        textarea
        onChange={evt => {}}
      />
    );
    expect(el.find('textarea').getDOMNode().value).toBe('hello world');
  });

  it('can have custom classnames on input', () => {
    const el = mount(<TextField className={'my-custom-classname'} />);
    expect(!!~el.html().search('my-custom-classname')).toEqual(true);
  });
});
