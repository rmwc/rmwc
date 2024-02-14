import React from 'react';

import {
  DocProps,
  Docs,
  DocsExample,
  DocsP,
  DocsSubtitle
} from '@rmwc/doc-utils';
import examples from '../generated-examples/chip.json';
import propsSrc from '../generated-props/chip.json';

import { Chip, ChipSet } from '@rmwc/chip';

export default function Readme() {
  return (
    <Docs
      title="Chips"
      lead="Chips represent complex entities in small blocks, such as a contact."
      module="@rmwc/chip"
      styles={[
        '@material/chips/dist/mdc.chips.css',
        '@rmwc/icon/icon.css',
        '@material/ripple/dist/mdc.ripple.css'
      ]}
      docsLink="https://material.io/develop/web/components/chips/"
      examples={examples}
    >
      <DocsExample label="Default">
        <ChipSet>
          <Chip selected label="Cookies" />
          <Chip label="Pizza" />
          <Chip label="Icecream" />
        </ChipSet>
      </DocsExample>
      <DocsExample label="With Icons">
        <ChipSet>
          <Chip icon="favorite" label="Cookies" trailingIcon="close" />
        </ChipSet>
      </DocsExample>
      <DocsExample label="Event Handling">
        {/* @ts-ignore */}
        {function Example() {
          const [selected, setSelected] = React.useState(false);
          return (
            <ChipSet input>
              <Chip
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
            </ChipSet>
          );
        }}
      </DocsExample>
      <DocsExample label="Disabled">
        <ChipSet>
          <Chip label="Cookies" disabled />
        </ChipSet>
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
        {/* @ts-ignore */}
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
            <ChipSet action>
              <Chip
                selected={selected.cookies}
                onInteraction={() => toggleSelected('cookies')}
                label="Cookies"
              />
              <Chip
                selected={selected.pizza}
                onInteraction={() => toggleSelected('pizza')}
                icon="local_pizza"
                label="Pizza"
              />
              <Chip
                selected={selected.icecream}
                onInteraction={() => toggleSelected('icecream')}
                icon="favorite_border"
                label="Icecream"
              />
            </ChipSet>
          );
        }}
      </DocsExample>

      <DocsExample label="Input">
        {/* @ts-ignore */}
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
            <ChipSet input>
              <Chip
                selected={selected.cookies}
                onInteraction={() => toggleSelected('cookies')}
                icon="cookie"
                label="Cookies"
              />
              <Chip
                selected={selected.pizza}
                onInteraction={() => toggleSelected('pizza')}
                icon="local_pizza"
                label="Pizza"
              />
              <Chip
                selected={selected.icecream}
                onInteraction={() => toggleSelected('icecream')}
                icon="favorite_border"
                label="Icecream"
              />
            </ChipSet>
          );
        }}
      </DocsExample>

      <DocsExample label="Filter">
        {/* @ts-ignore */}
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
              //@ts-ignore
              [key]: !selected[key]
            });

          return (
            <ChipSet filter>
              <Chip
                selected={selected.cookies}
                onInteraction={() => toggleSelected('cookies')}
                icon="cookie"
                label="Cookies"
              />
              <Chip
                selected={selected.pizza}
                onInteraction={() => toggleSelected('pizza')}
                icon="local_pizza"
                label="Pizza"
              />
              <Chip
                selected={selected.icecream}
                onInteraction={() => toggleSelected('icecream')}
                icon="favorite_border"
                label="Icecream"
              />
            </ChipSet>
          );
        }}
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          { displayName: 'Chip', component: Chip },
          { displayName: 'ChipSet', component: ChipSet }
        ]}
      />
    </Docs>
  );
}

export const galleryExample = <Chip selected checkmark label="Cookies" />;
