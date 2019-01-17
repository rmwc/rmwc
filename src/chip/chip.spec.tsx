import * as React from 'react';
import { mount } from 'enzyme';
import { Chip, ChipSet, ChipIcon } from './';

describe('Chip', () => {
  it('renders', () => {
    const el = mount(
      <ChipSet>
        <Chip leadingIcon="favorite" trailingIcon="close" text="test-label" />
      </ChipSet>
    );

    expect(el.html().includes('test-label')).toBe(true);
  });

  it('renders with children', () => {
    const el = mount(
      <ChipSet>
        <Chip leadingIcon="favorite" trailingIcon="close">
          test-label
        </Chip>
      </ChipSet>
    );

    expect(el.html().includes('test-label')).toBe(true);
  });

  it('handles selected', () => {
    const el = mount(
      <ChipSet>
        <Chip checkmark selected text="test-label" />
      </ChipSet>
    );

    expect(el.html().includes('mdc-chip--selected')).toBe(true);
  });

  it('handles onInteraction', () => {
    let value = 0;
    const el = mount(<Chip onInteraction={() => value++} />);
    const inst = el.instance();
    inst.foundation.adapter_.notifyInteraction();
    expect(value).toEqual(1);
  });

  it('handles custom ChipIcon', () => {
    const el = mount(<Chip leadingIcon={<ChipIcon icon="favorite" />} />);
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

    const a = el.instance().foundation.adapter_;
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

  it('adapter checks', () => {
    const el = mount(
      <Chip leadingIcon="favorite" trailingIcon="close" text="test-label" />
    );

    const inst = el.instance();
    const a = inst.foundation.adapter_;

    a.addClass('test');
    a.hasClass('test');
    a.removeClass('test');
    a.addClassToLeadingIcon('test');
    a.removeClassFromLeadingIcon('test');
    a.eventTargetHasClass(inst.root_, 'test');
    a.notifyInteraction();
    a.notifySelection(true);
    a.notifyTrailingIconInteraction();
    a.notifyRemoval();
    a.getComputedStyleValue('color');
    a.setStyleProperty('color', 'red');
  });
});
