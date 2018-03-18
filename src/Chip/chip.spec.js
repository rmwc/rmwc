import React from 'react';
import { mount } from 'enzyme';
import { Chip, ChipText, ChipIcon, ChipSet } from './';

describe('Chip', () => {
  it('renders', () => {
    mount(
      <ChipSet>
        <Chip>
          <ChipIcon use="favorite" />
          <ChipText>One</ChipText>
        </Chip>
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

  it('handles apiRef', () => {
    let api = null;

    mount(
      <Chip apiRef={ref => (api = ref)}>
        <ChipIcon use="favorite" />
        <ChipText>One</ChipText>
      </Chip>
    );

    expect(api).toBeTruthy();
  });
});

describe('ChipIcon', () => {
  it('renders', () => {
    mount(<ChipIcon use="favorite" />);
  });

  it('can be leading', () => {
    mount(<ChipIcon leading use="favorite" />);
  });

  it('can be trailing', () => {
    mount(<ChipIcon trailing use="favorite" />);
  });
});
