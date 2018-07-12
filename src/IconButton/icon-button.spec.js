import * as React from 'react';
import { mount } from 'enzyme';
import { IconButton } from './';

describe('', () => {
  it('renders', () => {
    mount(<IconButton use="star" label="Rate this!" />);
    mount(
      <IconButton
        use="https://www2.le.ac.uk/departments/law/images/twitter-follow-us-icon"
        label="Tweet it!"
      />
    );
  });

  it('renders as toggle', () => {
    mount(
      <IconButton
        onLabel="Remove from favorites"
        onContent="favorite"
        offLabel="Add to favorites"
        offContent="favorite_border"
      />
    );
  });

  it('renders controlled', () => {
    mount(
      <IconButton
        checked={true}
        onClick={() => {}}
        onLabel="Remove from favorites"
        onContent="star"
        offLabel="Add to favorites"
        offContent="star_border"
      />
    );
  });

  it('handles onChange', () => {
    let value = 0;
    const el = mount(
      <IconButton
        onChange={() => (value += 1)}
        onLabel="Remove from favorites"
        onContent="favorite"
        offLabel="Add to favorites"
        offContent="favorite_border"
      />
    );
    const inst = el.instance();
    inst.foundation_.adapter_.notifyChange();

    expect(value).toEqual(1);
  });

  it('can have custom classnames', () => {
    const el = mount(
      <IconButton
        use="star"
        label="Rate this!"
        className={'my-custom-classname'}
      />
    );
    expect(el.html().includes('my-custom-classname')).toEqual(true);
  });
});
