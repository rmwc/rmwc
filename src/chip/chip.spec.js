import * as React from 'react';
import { mount } from 'enzyme';
import { Chip, ChipSet } from './';

describe('Chip', () => {
  it('renders', () => {
    mount(
      <ChipSet>
        <Chip leadingIcon="favorite" trailingIcon="close" label="One" />
      </ChipSet>
    );
  });

  it('handles onInteraction', () => {
    let value = 0;
    const el = mount(<Chip onInteraction={() => value++} />);
    const inst = el.instance();
    inst.foundation_.adapter_.notifyInteraction();
    expect(value).toEqual(1);
  });

  it('handles onTrailingIconInteraction', () => {
    let value = 0;
    const el = mount(<Chip onTrailingIconInteraction={() => value++} />);
    const inst = el.instance();
    inst.foundation_.adapter_.notifyTrailingIconInteraction();
    expect(value).toEqual(1);
  });

  it('handles onRemove', () => {
    let value = 0;
    const el = mount(<Chip onRemove={() => value++} />);
    const inst = el.instance();
    inst.foundation_.adapter_.notifyRemoval();
    expect(value).toEqual(1);
  });
});
