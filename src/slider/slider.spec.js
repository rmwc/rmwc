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
    el.setProps({ discrete: true }, () => {
      window.requestAnimationFrame(() => {
        expect(el.instance().discrete).toBe(true);
      });
    });

    el.setProps({ displayMarkers: true }, () => {
      expect(el.instance().displayMarkers).toBe(true);
    });

    el.setProps({ discrete: true }, () => {
      expect(el.instance().discrete).toBe(true);
    });

    el.setProps({ value: 1 }, () => {
      expect(el.instance().value).toBe(1);
    });

    el.setProps({ max: 1 }, () => {
      expect(el.instance().max).toBe(1);
    });

    el.setProps({ min: 1 }, () => {
      expect(el.instance().min).toBe(1);
    });

    el.setProps({ step: 2 }, () => {
      expect(el.instance().step).toBe(2);
    });

    el.setProps({ disabled: true }, () => {
      expect(el.instance().disabled).toBe(true);
    });

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
    const inst = el.instance();
    inst.foundation_.adapter_.notifyChange();

    expect(value).toEqual(1);
  });

  it('handles onInput', () => {
    let value = 0;
    const el = mount(<Slider onInput={() => value++} />);
    const inst = el.instance();
    inst.foundation_.adapter_.notifyInput();

    expect(value).toEqual(1);
  });

  it('handles min > 100', () => {
    mount(<Slider min={101} max={200} />);
  });

  it('can have custom classnames', () => {
    const el = mount(<Slider className={'my-custom-classname'} />);
    expect(el.html().includes('my-custom-classname')).toEqual(true);
  });
});
