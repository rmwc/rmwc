import React, { useState } from 'react';
import { ChipEvolution } from './chip-evolution';
import type { Meta, StoryObj } from '@storybook/react';
import { ChipSetEvolution } from './chip-set-evolution';

export default {
  title: 'Evolution Chips',
  component: ChipEvolution
} as Meta;

type Story = StoryObj<typeof ChipEvolution>;

const toggleSelected = (selected, id) => {
  const newSelected = new Set(selected);
  if (selected.has(id)) {
    newSelected.delete(id);
  } else {
    newSelected.add(id);
  }
  return newSelected;
};

export const ChipEvolutionStory: Story = {
  render: (args) => {
    const ChipEvolutionStoryComponent = () => {
      const [selected, setSelected] = useState(new Set());

      return (
        <ChipSetEvolution>
          <ChipEvolution
            selected={selected.has(1)}
            onClick={() => setSelected(toggleSelected(selected, 1))}
            label="Cookies"
            checkmark
            trailingIcon="close"
          />
        </ChipSetEvolution>
      );
    };

    return <ChipEvolutionStoryComponent />;
  }
};

export const ChipEvolutionSelectedStory: Story = {
  render: (args) => (
    <ChipSetEvolution>
      <ChipEvolution label="Cookies" selected checkmark />
      <ChipEvolution label="Pizza" />
      <ChipEvolution label="Icecream" />
    </ChipSetEvolution>
  )
};

export const ChipEvolutionWithIconsStory: Story = {
  render: (args) => (
    <ChipSetEvolution>
      <ChipEvolution
        icon="star_border"
        trailingIcon="close"
        label="Cookies"
        selected
      />
      <ChipEvolution
        icon="favorite_border"
        trailingIcon="close"
        label="Pizza"
      />
      <ChipEvolution icon="mood" trailingIcon="close" label="Icecream" />
    </ChipSetEvolution>
  )
};

export const ChipEvolutionNewFoundationStory: Story = {
  render: (args) => (
    <ChipEvolution
      label="Cookies"
      trailingIcon="close"
      onRemove={() => console.log('onRemove')}
      onTrailingIconInteraction={() => console.log('onTrailingIconInteraction')}
    />
  )
};
