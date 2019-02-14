import * as React from 'react';
import { mount } from 'enzyme';
import { Checkbox } from './';

describe('Checkbox', () => {
  test('renders', () => {
    const checkbox = mount(<Checkbox />);
    expect(!!~checkbox.html().search('mdc-checkbox')).toEqual(true);
    checkbox.unmount();
  });

  test('can be checked', () => {
    const checkbox = mount(<Checkbox checked={true} onChange={() => {}} />);
    expect(
      (checkbox.find('input').getDOMNode() as HTMLInputElement).checked
    ).toEqual(true);
  });

  test('handles onChange', () => {
    let value = 0;
    const checkbox = mount(
      <Checkbox checked={true} onChange={() => value++} />
    );

    checkbox.find('input').simulate('change');
    expect(value).toEqual(1);
  });

  test('can be disabled', () => {
    const checkbox = mount(<Checkbox disabled />);
    expect(
      (checkbox.find('input').getDOMNode() as HTMLInputElement).disabled
    ).toEqual(true);
  });

  test('can be indeterminate', () => {
    const checkbox = mount(<Checkbox indeterminate />);
    expect(
      (checkbox.find('input').getDOMNode() as HTMLInputElement).indeterminate
    ).toEqual(true);
  });

  test('can have a label', () => {
    const checkbox = mount(<Checkbox label="hello world" />);
    expect(checkbox.text()).toEqual('hello world');
  });

  test('can have custom classnames on input', () => {
    const el = mount(<Checkbox className={'my-custom-classname'} />);
    expect(!!~el.html().search('my-custom-classname')).toEqual(true);
  });

  test('foundation check', () => {
    const el = mount(
      <Checkbox checked={false} className={'my-custom-classname'} />
    );
    const adapter = (el.instance() as any).foundation.adapter_;
    adapter.addClass('test');
    adapter.removeClass('test');
    adapter.setNativeControlAttr('checked', true);
    adapter.removeNativeControlAttr('checked');
    adapter.getNativeControl();
    adapter.isIndeterminate();
    adapter.isChecked();
    adapter.hasNativeControl();
    adapter.setNativeControlDisabled(true);
    adapter.setNativeControlDisabled(false);
    adapter.forceLayout();
    adapter.isAttachedToDOM();
  });
});
