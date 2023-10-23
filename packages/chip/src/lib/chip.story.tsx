import React from 'react';

import { storiesOf } from '@storybook/react';
import { Chip } from './chip';
import { ChipSet } from './chip-set';

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

storiesOf('Chips', module)
  .add('Chip', () => (
    <ChipSet>
      <Chip label="Cookies" foundationRef={console.log} />
      <Chip label="Pizza" />
      <Chip label="Icecream" />
    </ChipSet>
  ))
  .add('Chip selected', () => (
    <ChipSet>
      <Chip label="Cookies" selected checkmark />
      <Chip label="Pizza" />
      <Chip label="Icecream" />
    </ChipSet>
  ))
  .add('Chip with icons', () => (
    <ChipSet>
      <Chip icon="star_border" trailingIcon="close" label="Cookies" selected />
      <Chip icon="favorite_border" trailingIcon="close" label="Pizza" />
      <Chip icon="mood" trailingIcon="close" label="Icecream" />
    </ChipSet>
  ))
  .add('Chip filtering', () => <ChipFiltering />)
  .add('Chip: New Foundation', () => (
    <Chip
      label="Cookies"
      trailingIcon="close"
      onRemove={() => console.log('onRemove')}
      onTrailingIconInteraction={() => console.log('onTrailingIconInteraction')}
    />
  ));
