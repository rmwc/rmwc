import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { Chip, ChipSet } from '.';

export default {
  title: 'Evolution Chips',
  component: Chip
} as Meta;

type Story = StoryObj<typeof Chip>;

const toggleSelected = (selected, id) => {
  const newSelected = new Set(selected);
  if (selected.has(id)) {
    newSelected.delete(id);
  } else {
    newSelected.add(id);
  }
  return newSelected;
};

export const ChipStory: Story = {
  render: (args) => (
    <ChipSet>
      <Chip label="Cookies" foundationRef={console.log} />
      <Chip label="Pizza" />
      <Chip label="Icecream" />
    </ChipSet>
  )
};

export const ChipSelectedStory: Story = {
  render: (args) => (
    <ChipSet>
      <Chip label="Cookies" selected checkmark />
      <Chip label="Pizza" />
      <Chip label="Icecream" />
    </ChipSet>
  )
};

export const ChipIconStory: Story = {
  render: (args) => (
    <ChipSet>
      <Chip icon="star_border" trailingIcon="close" label="Cookies" selected />
      <Chip icon="favorite_border" trailingIcon="close" label="Pizza" />
      <Chip icon="mood" trailingIcon="close" label="Icecream" />
    </ChipSet>
  )
};

export const ChipFiltering: Story = {
  render: (args) => {
    const ChipFiltering = () => {
      const [selected, setSelected] = useState(new Set());

      return (
        <ChipSet filter>
          <Chip
            selected={selected.has(1)}
            onClick={() => toggleSelected(selected, 1)}
            label="Cookies"
            checkmark
            trailingIcon="close"
          />
          <Chip
            selected={selected.has(2)}
            onClick={() => toggleSelected(selected, 2)}
            label="Pizza"
            checkmark
            trailingIcon="close"
          />
          <Chip
            selected={selected.has(3)}
            onClick={() => toggleSelected(selected, 3)}
            label="Icecream"
            checkmark
            icon="favorite"
            trailingIcon="close"
          />
        </ChipSet>
      );
    };

    return <ChipFiltering />;
  }
};

export const ChipNewFoundationStory: Story = {
  render: (args) => (
    <Chip
      label="Cookies"
      trailingIcon="close"
      onRemove={() => console.log('onRemove')}
      onTrailingIconInteraction={() => console.log('onTrailingIconInteraction')}
    />
  )
};
