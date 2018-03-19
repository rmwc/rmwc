import React from 'react';
import { mount } from 'enzyme';
import { IconToggle } from './';

describe('IconToggle', () => {
  it('renders', () => {
    mount(
      <IconToggle
        on={{ label: 'Remove from favorites', content: 'favorite' }}
        off={{ label: 'Add to favorites', content: 'favorite_border' }}
      />
    );
  });

  it('renders controlled', () => {
    mount(
      <IconToggle
        checked
        on={{ label: 'Remove from favorites', content: 'favorite' }}
        off={{ label: 'Add to favorites', content: 'favorite_border' }}
      />
    );
  });

  it('handles onChange', () => {
    let value = 0;
    const el = mount(
      <IconToggle
        on={{ label: 'Remove from favorites', content: 'favorite' }}
        off={{ label: 'Add to favorites', content: 'favorite_border' }}
        onChange={() => value++}
      />
    );
    const inst = el.instance();
    inst.foundation_.adapter_.notifyChange();

    expect(value).toEqual(1);
  });

  it('handles apiRef', () => {
    let api = null;

    const el = mount(
      <IconToggle
        apiRef={ref => (api = ref)}
        on={{ label: 'Remove from favorites', content: 'favorite' }}
        off={{ label: 'Add to favorites', content: 'favorite_border' }}
      />
    );

    expect(api).toBeTruthy();
  });

  it('can have custom classnames', () => {
    const el = mount(
      <IconToggle
        on={{ label: 'Remove from favorites', content: 'favorite' }}
        off={{ label: 'Add to favorites', content: 'favorite_border' }}
        className={'my-custom-classname'}
      />
    );
    expect(!!~el.html().search('my-custom-classname')).toEqual(true);
  });
});
