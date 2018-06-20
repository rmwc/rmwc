import * as React from 'react';
import { mount } from 'enzyme';
import { Slider } from './';

describe('Slider', () => {
  it('renders uncontrolled', () => {
    mount(<Slider />);
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

  it('handles apiRef', () => {
    let api = null;

    mount(<Slider apiRef={ref => (api = ref)} />);

    expect(api).toBeTruthy();
  });

  it.only('handles min > 100', () => {
    mount(<Slider min={101} max={200} />);
  });

  it('can have custom classnames', () => {
    const el = mount(<Slider className={'my-custom-classname'} />);
    expect(!!~el.html().search('my-custom-classname')).toEqual(true);
  });
});
