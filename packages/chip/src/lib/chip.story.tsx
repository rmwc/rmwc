import React, { useState } from 'react';
import { Chip } from './chip';
import type { Meta, StoryObj } from '@storybook/react';
import { ChipSet } from './chip-set';

export default {
  title: 'Chips',
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
  render: (args) => {
    const ChipStoryComponent = () => {
      const [selected, setSelected] = useState(new Set());

      return (
        <ChipSet>
          <Chip
            selected={selected.has(1)}
            onClick={() => setSelected(toggleSelected(selected, 1))}
            label="Cookies"
            checkmark
            trailingIcon="close"
          />
        </ChipSet>
      );
    };

    return <ChipStoryComponent />;
  }
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

export const ChipWithIconsStory: Story = {
  render: (args) => (
    <ChipSet>
      <Chip icon="star_border" trailingIcon="close" label="Cookies" selected />
      <Chip icon="favorite_border" trailingIcon="close" label="Pizza" />
      <Chip icon="mood" trailingIcon="close" label="Icecream" />
    </ChipSet>
  )
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
