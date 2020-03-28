import * as React from 'react';
import { mount } from 'enzyme';
import { Slider } from './';

jest.spyOn(console, 'warn');

describe('Slider', () => {
  it('renders uncontrolled', () => {
    mount(<Slider />);
  });

  it('handles prop changes', done => {
    const el = mount(<Slider />);
    el.setProps({ discrete: true });

    el.setProps({ displayMarkers: true });

    el.setProps({ discrete: true });

    el.setProps({ value: 1 });

    el.setProps({ max: 1 });

    el.setProps({ min: 1 });

    el.setProps({ step: 2 });

    el.setProps({ disabled: true });

    setTimeout(done, 200);
  });

  it('warns when not displayMarkers and discrete', () => {
    mount(<Slider displayMarkers />);
    expect(console.warn).toHaveBeenCalled();
  });

  it('renders with all props', () => {
    mount(
      <Slider
        value={50}
        discrete
        displayMarkers
        min={0}
        max={100}
        step={10}
        disabled
        onChange={() => {}}
        onInput={() => {}}
      />
    );
  });

  it('handles onChange', () => {
    let value = 0;
    const el = mount(<Slider onChange={() => value++} />);
    el.props().onChange({ detail: { value: 1 } });
    expect(value).toEqual(1);
  });

  it('handles onInput', () => {
    let value = 0;
    const el = mount(<Slider onInput={() => value++} />);
    el.props().onInput({ detail: { value: 1 } });

    expect(value).toEqual(1);
  });

  it('handles min > 100', () => {
    mount(<Slider min={101} max={200} />);
  });

  it('handles out of bounds', () => {
    mount(<Slider value={0} min={1} max={2} />);
    mount(<Slider value={3} min={1} max={2} />);
  });

  it('can have custom classnames', () => {
    const el = mount(<Slider className={'my-custom-classname'} />);
    expect(el.html().includes('my-custom-classname')).toEqual(true);
  });
});
