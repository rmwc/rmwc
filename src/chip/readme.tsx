import React from 'react';

import { Docs, DocsExample, DocProps, DocsSubtitle, DocsP } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { Chip, ChipSet } from '.';

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
            <ChipSet>
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

      <DocsSubtitle>Layout grid chip sets / Listbox chip sets</DocsSubtitle>
      <DocsP>
        Chip sets have two varieties: layout grid chip sets and listbox chip
        sets.
      </DocsP>
      <DocsP>
        Layout grid chip sets follow the layout grid interaction pattern. They
        contain either action chips or input chips.
      </DocsP>
      <DocsP>
        Listbox chip sets follow the follow the listbox interaction pattern They
        contain filter chips chips.
      </DocsP>

      <DocsExample label="Grid">
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
            <ChipSet role="grid">
              <Chip
                selected={selected.cookies}
                checkmark
                onInteraction={() => toggleSelected('cookies')}
                label="Cookies"
              />
              <Chip
                selected={selected.pizza}
                checkmark
                onInteraction={() => toggleSelected('pizza')}
                icon="local_pizza"
                label="Pizza"
              />
              <Chip
                selected={selected.icecream}
                checkmark
                onInteraction={() => toggleSelected('icecream')}
                icon="favorite_border"
                label="Icecream"
              />
            </ChipSet>
          );
        }}
      </DocsExample>

      <DocsExample label="Listbox">
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
            <ChipSet role="listbox">
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
