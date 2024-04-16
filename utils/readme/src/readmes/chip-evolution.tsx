import React from 'react';

import {
  DocProps,
  Docs,
  DocsExample,
  DocsP,
  DocsSubtitle
} from '@rmwc/doc-utils';
import examples from '../generated-examples/chip-evolution.json';
import propsSrc from '../generated-props/chip-evolution.json';

import { ChipEvolution, ChipSetEvolution } from '@rmwc/chip-evolution';

export default function Readme() {
  return (
    <Docs
      title="Evolution Chips"
      lead="Evolution Chips represent complex entities in small blocks, such as a contact. Evolution Chips are utilizing the new chip api from material version 14."
      module="@rmwc/chip-evolution"
      styles={[
        '@material/chips/dist/mdc.chips.css',
        '@rmwc/icon/icon.css',
        '@material/ripple/dist/mdc.ripple.css'
      ]}
      docsLink="https://material.io/develop/web/components/chips/"
      examples={examples}
    >
      <DocsExample label="use state">
        {function Example() {
          const [selectedOptions, setSelectedOptions] = React.useState<
            string[]
          >(['foo', 'bar', 'baz']);
          const options = [
            { label: 'Foo', value: 'foo' },
            { label: 'Bar', value: 'bar' },
            { label: 'Baz', value: 'baz' }
          ];

          const onRemoveItem = (selectedOption: string) => {
            const index = selectedOptions.indexOf(selectedOption);
            if (index === -1) {
              return;
            }

            const modifiedArray = selectedOptions
              .slice(0, index)
              .concat(selectedOptions.slice(index + 1));

            setSelectedOptions(modifiedArray);
          };

          return (
            <div>
              <ChipSetEvolution input>
                {selectedOptions.map((selectedOption) => (
                  <ChipEvolution
                    id={selectedOption}
                    key={selectedOption}
                    label={selectedOption}
                    onRemove={() => onRemoveItem(selectedOption)}
                    trailingIcon="close"
                  />
                ))}
              </ChipSetEvolution>
            </div>
          );
        }}
      </DocsExample>
      <DocsExample label="Default">
        <ChipSetEvolution>
          <ChipEvolution selected label="Cookies" />
          <ChipEvolution label="Pizza" />
          <ChipEvolution label="Icecream" />
        </ChipSetEvolution>
      </DocsExample>
      <DocsExample label="With Icons">
        <ChipSetEvolution>
          <ChipEvolution icon="favorite" label="Cookies" trailingIcon="close" />
        </ChipSetEvolution>
      </DocsExample>

      <DocsExample label="Event Handling">
        {function Example() {
          const [selected, setSelected] = React.useState(false);
          return (
            <ChipSetEvolution input>
              <ChipEvolution
                key="my-chip"
                label="Click Me"
                checkmark
                selected={selected}
                onRemove={(evt) => console.log('onRemove', evt.detail)}
                onInteraction={(evt) => {
                  console.log('onInteraction', evt.detail);
                  setSelected(!selected);
                }}
                trailingIcon="close"
              />
            </ChipSetEvolution>
          );
        }}
      </DocsExample>

      <DocsExample label="Disabled">
        <ChipSetEvolution>
          <ChipEvolution label="Cookies" disabled />
        </ChipSetEvolution>
      </DocsExample>

      <DocsSubtitle>Chipset variation</DocsSubtitle>
      <DocsP>
        Chipsets can consist of action chips, input chips or filter chips.
      </DocsP>
      <DocsP>
        Action chips follows the layout grid interaction pattern. Action chips
        have a single mandatory primary action.
      </DocsP>
      <DocsP>
        Input chips follows the layout grid interaction pattern. Input chips
        have a mandatory primary and trailing action.
      </DocsP>
      <DocsP>Filter chips follows the listbox interaction pattern.</DocsP>

      <DocsExample label="Action">
        {function Example() {
          const [selected, setSelected] = React.useState({
            cookies: false,
            pizza: false,
            icecream: false
          });
          //@ts-ignore
          const toggleSelected = (key) =>
            setSelected({
              ...selected,
              //@ts-ignore
              [key]: !selected[key]
            });

          return (
            <ChipSetEvolution action>
              <ChipEvolution
                selected={selected.cookies}
                onInteraction={() => toggleSelected('cookies')}
                label="Cookies"
              />
              <ChipEvolution
                selected={selected.pizza}
                onInteraction={() => toggleSelected('pizza')}
                icon="local_pizza"
                label="Pizza"
              />
              <ChipEvolution
                selected={selected.icecream}
                onInteraction={() => toggleSelected('icecream')}
                icon="favorite_border"
                label="Icecream"
              />
            </ChipSetEvolution>
          );
        }}
      </DocsExample>

      <DocsExample label="Input">
        {function Example() {
          const [selected, setSelected] = React.useState({
            cookies: false,
            pizza: false,
            icecream: false
          });
          //@ts-ignore
          const toggleSelected = (key) =>
            setSelected({
              ...selected,
              // @ts-ignore
              [key]: !selected[key]
            });

          return (
            <ChipSetEvolution input>
              <ChipEvolution
                selected={selected.cookies}
                onInteraction={() => toggleSelected('cookies')}
                icon="cookie"
                label="Cookies"
              />
              <ChipEvolution
                selected={selected.pizza}
                onInteraction={() => toggleSelected('pizza')}
                icon="local_pizza"
                label="Pizza"
              />
              <ChipEvolution
                selected={selected.icecream}
                onInteraction={() => toggleSelected('icecream')}
                icon="favorite_border"
                label="Icecream"
              />
            </ChipSetEvolution>
          );
        }}
      </DocsExample>

      <DocsExample label="Filter">
        {function Example() {
          const [selected, setSelected] = React.useState({
            cookies: true,
            pizza: false,
            icecream: false
          });
          //@ts-ignore
          const toggleSelected = (key) =>
            setSelected({
              ...selected,
              // @ts-ignore
              [key]: !selected[key]
            });

          return (
            <ChipSetEvolution filter>
              <ChipEvolution
                selected={selected.cookies}
                onInteraction={() => toggleSelected('cookies')}
                icon="cookie"
                label="Cookies"
              />
              <ChipEvolution
                selected={selected.pizza}
                onInteraction={() => toggleSelected('pizza')}
                icon="local_pizza"
                label="Pizza"
              />
              <ChipEvolution
                selected={selected.icecream}
                onInteraction={() => toggleSelected('icecream')}
                icon="favorite_border"
                label="Icecream"
              />
            </ChipSetEvolution>
          );
        }}
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          { displayName: 'ChipEvolution', component: ChipEvolution },
          { displayName: 'ChipSetEvolution', component: ChipSetEvolution }
        ]}
      />
    </Docs>
  );
}

export const galleryExample = (
  <ChipEvolution selected checkmark label="Cookies" />
);
