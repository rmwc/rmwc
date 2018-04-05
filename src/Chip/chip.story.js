import React from 'react';

import { storiesOf } from '@storybook/react';
import {
  Chip,
  ChipText,
  ChipIcon,
  ChipSet,
  ChipCheckmark,
  SimpleChip
} from './';

class ChipFiltering extends React.Component {
  state = {
    selected: new Set()
  };

  toggle(value) {
    this.state.selected.has(value) ?
      this.state.selected.delete(value) :
      this.state.selected.add(value);

    this.forceUpdate();
  }

  render() {
    return (
      <ChipSet filter>
        <Chip
          selected={this.state.selected.has(1)}
          onClick={() => this.toggle(1)}
        >
          <ChipCheckmark />
          <ChipText>Cookies</ChipText>
          <ChipIcon tabIndex={0} use="close" trailing />
        </Chip>
        <Chip
          selected={this.state.selected.has(2)}
          onClick={() => this.toggle(2)}
        >
          <ChipCheckmark />
          <ChipText>Pizza</ChipText>
          <ChipIcon use="close" trailing />
        </Chip>
        <Chip
          selected={this.state.selected.has(3)}
          onClick={() => this.toggle(3)}
        >
          <ChipIcon use="favorite" leading />
          <ChipCheckmark />
          <ChipText>Icecream</ChipText>
          <ChipIcon use="close" trailing />
        </Chip>
      </ChipSet>
    );
  }
}

storiesOf('Chips', module)
  .add('Chip', () => (
    <ChipSet>
      <Chip>
        <ChipText>Cookies</ChipText>
      </Chip>
      <Chip>
        <ChipText>Pizza</ChipText>
      </Chip>
      <Chip>
        <ChipText>Icecream</ChipText>
      </Chip>
    </ChipSet>
  ))
  .add('Chip selected', () => (
    <ChipSet>
      <Chip selected>
        <ChipText>Cookies</ChipText>
      </Chip>
      <Chip>
        <ChipText>Pizza</ChipText>
      </Chip>
      <Chip>
        <ChipText>Icecream</ChipText>
      </Chip>
    </ChipSet>
  ))
  .add('Chip with icons', () => (
    <ChipSet>
      <Chip>
        <ChipIcon use="star_border" leading />
        <ChipText>Cookies</ChipText>
        <ChipIcon tabIndex={0} use="close" trailing />
      </Chip>
      <Chip>
        <ChipIcon use="favorite_border" leading />
        <ChipText>Pizza</ChipText>
        <ChipIcon use="close" trailing />
      </Chip>
      <Chip>
        <ChipIcon use="mood" leading />
        <ChipText>Icecream</ChipText>
        <ChipIcon use="close" trailing />
      </Chip>
    </ChipSet>
  ))
  .add('Chip filtering', () => <ChipFiltering />)
  .add('SimpleChip', () => (
    <SimpleChip leadingIcon="face" trailingIcon="close" text="test" checkmark />
  ));
