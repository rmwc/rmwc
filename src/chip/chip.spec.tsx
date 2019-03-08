import * as React from 'react';
import { mount } from 'enzyme';
import { Chip, ChipSet, ChipIcon } from './';

describe('Chip', () => {
  it('renders', () => {
    const el = mount(
      <ChipSet>
        <Chip icon="favorite" trailingIcon="close" label="test-label" />
      </ChipSet>
    );

    expect(el.html().includes('test-label')).toBe(true);
  });

  it('renders with children', () => {
    const el = mount(
      <ChipSet>
        <Chip icon="favorite" trailingIcon="close">
          test-label
        </Chip>
      </ChipSet>
    );

    expect(el.html().includes('test-label')).toBe(true);
  });

  it('handles selected', () => {
    const el = mount(
      <ChipSet>
        <Chip checkmark selected label="test-label" />
      </ChipSet>
    );

    expect(el.html().includes('mdc-chip--selected')).toBe(true);
  });

  it('handles onInteraction', () => {
    let value = 0;
    const el = mount(<Chip onInteraction={() => value++} />);
    const inst = el.instance() as Chip;
    (inst.foundation as any).adapter_.notifyInteraction();
    expect(value).toEqual(1);
  });

  it('handles custom ChipIcon', () => {
    const el = mount(<Chip icon={<ChipIcon icon="favorite" />} />);
    expect(el.html().includes('favorite')).toBe(true);
  });

  it('handles onTrailingIconInteraction, onRemove, and onTransitionEnd', () => {
    let onInteraction = 0;
    let onRemove = 0;

    const el = mount(
      <Chip
        trailingIcon="close"
        onTrailingIconInteraction={() => onInteraction++}
        onRemove={() => onRemove++}
      />
    );
    el.find('.mdc-chip__icon--trailing')
      .first()
      .simulate('click');

    expect(onInteraction).toEqual(1);

    const a = (el.instance() as any).foundation.adapter_;
    a.notifyRemoval();
    expect(onRemove).toEqual(1);

    el.simulate('transitionend');
  });

  it('handles onInteraction', () => {
    let value = 0;
    const el = mount(<Chip onInteraction={() => value++} />);
    el.simulate('click');
    expect(value).toEqual(1);
  });
});
