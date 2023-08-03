import React from 'react';

import { Chip, ChipSet } from '.';

class ChipFiltering extends React.Component {
  state = {
    selected: new Set()
  };

  toggle(value: any) {
    this.state.selected.has(value)
      ? this.state.selected.delete(value)
      : this.state.selected.add(value);

    this.forceUpdate();
  }

  render() {
    return (
      <ChipSet filter>
        <Chip
          selected={this.state.selected.has(1)}
          onClick={() => this.toggle(1)}
          label="Cookies"
          checkmark
          trailingIcon="close"
        />
        <Chip
          selected={this.state.selected.has(2)}
          onClick={() => this.toggle(2)}
          label="Pizza"
          checkmark
          trailingIcon="close"
        />
        <Chip
          selected={this.state.selected.has(3)}
          onClick={() => this.toggle(3)}
          label="Icecream"
          checkmark
          icon="favorite"
          trailingIcon="close"
        />
      </ChipSet>
    );
  }
}

export default {
  title: 'Chips'
};

export const _Chip = () => (
  <ChipSet>
    <Chip label="Cookies" foundationRef={console.log} />
    <Chip label="Pizza" />
    <Chip label="Icecream" />
  </ChipSet>
);

export const ChipSelected = () => (
  <ChipSet>
    <Chip label="Cookies" selected checkmark />
    <Chip label="Pizza" />
    <Chip label="Icecream" />
  </ChipSet>
);

ChipSelected.story = {
  name: 'Chip selected'
};

export const ChipWithIcons = () => (
  <ChipSet>
    <Chip icon="star_border" trailingIcon="close" label="Cookies" selected />
    <Chip icon="favorite_border" trailingIcon="close" label="Pizza" />
    <Chip icon="mood" trailingIcon="close" label="Icecream" />
  </ChipSet>
);

ChipWithIcons.story = {
  name: 'Chip with icons'
};

export const _ChipFiltering = () => <ChipFiltering />;

_ChipFiltering.story = {
  name: 'Chip filtering'
};

export const ChipNewFoundation = () => (
  <Chip
    label="Cookies"
    trailingIcon="close"
    onRemove={() => console.log('onRemove')}
    onTrailingIconInteraction={() => console.log('onTrailingIconInteraction')}
  />
);

ChipNewFoundation.story = {
  name: 'Chip: New Foundation'
};
