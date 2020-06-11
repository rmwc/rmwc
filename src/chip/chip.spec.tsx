import React from 'react';
import { mount } from 'enzyme';
import { Chip, ChipSet } from './';
import { useChipFoundation } from './foundation';
import { mountHook } from '@rmwc/base/utils/test-utils';

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
        <Chip checkmark selected icon="favorite" label="test-label" />
      </ChipSet>
    );

    expect(el.html().includes('mdc-chip--selected')).toBe(true);
  });

  it('handles onInteraction', () => {
    let value = 0;
    const el = mount(<Chip onInteraction={() => value++} />);
    el.simulate('click');
    expect(value).toEqual(1);
  });

  it('handles custom ChipIcon', () => {
    const el = mount(<Chip icon="favorite" />);
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
    el.find('.mdc-chip__icon--trailing').first().simulate('click');

    expect(onInteraction).toEqual(1);
    el.simulate('transitionend');

    // Having to force a call of this since JSDOM cant
    // replicate MDCs internal animation behavior
    el.props().onRemove();

    expect(onRemove).toEqual(1);
  });

  it('handles onInteraction', () => {
    let value = 0;
    const el = mount(<Chip onInteraction={() => value++} />);
    el.simulate('click');
    expect(value).toEqual(1);
  });
});

describe('Chip: Foundation', () => {
  it('useChipFoundation', () => {
    mountHook(() => {
      const { foundation } = useChipFoundation({});
    });
  });
});
