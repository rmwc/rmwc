# Evolution Chips

Evolution Chips represent complex entities in small blocks, such as a contact. Evolution Chips are utilizing the new chip api from material version 14.

- Module **@rmwc/chip-evolution**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/chip-evolution/styles';
  - Or include stylesheets
    - **'@material/chips/dist/mdc.chips.css'**
    - **'@rmwc/icon/icon.css'**
    - **'@material/ripple/dist/mdc.ripple.css'**
- MDC Docs: [https://material.io/develop/web/components/chips/](https://material.io/develop/web/components/chips/)

```jsx
function Example() {
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
}
```

```jsx
<ChipSetEvolution>
  <ChipEvolution selected label="Cookies" />
  <ChipEvolution label="Pizza" />
  <ChipEvolution label="Icecream" />
</ChipSetEvolution>
```

```jsx
<ChipSetEvolution>
  <ChipEvolution icon="favorite" label="Cookies" trailingIcon="close" />
</ChipSetEvolution>
```

```jsx
function Example() {
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
}
```

```jsx
<ChipSetEvolution>
  <ChipEvolution label="Cookies" disabled />
</ChipSetEvolution>
```

## Chipset variation

Chipsets can consist of action chips, input chips or filter chips.

Action chips follows the layout grid interaction pattern. Action chips have a single mandatory primary action.

Input chips follows the layout grid interaction pattern. Input chips have a mandatory primary and trailing action.

Filter chips follows the listbox interaction pattern.

```jsx
function Example() {
  const [selected, setSelected] = React.useState({
    cookies: false,
    pizza: false,
    icecream: false
  });
  const toggleSelected = (key) =>
    setSelected({
      ...selected,
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
}
```

```jsx
function Example() {
  const [selected, setSelected] = React.useState({
    cookies: false,
    pizza: false,
    icecream: false
  });
  const toggleSelected = (key) =>
    setSelected({
      ...selected,
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
}
```

```jsx
function Example() {
  const [selected, setSelected] = React.useState({
    cookies: true,
    pizza: false,
    icecream: false
  });
  const toggleSelected = (key) =>
    setSelected({
      ...selected,
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
}
```

## ChipEvolution

A Chip component.

### Props

| Name                      | Type                                              | Description                                                                                        |
| ------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `checkmark`               | `boolean`                                         | Includes an optional checkmark for the chips selected state.                                       |
| `children`                | `ReactNode`                                       | Additional children will be rendered in the text area.                                             |
| `foundationRef`           | `Ref<MDCChipFoundation<>>`                        | Advanced: A reference to the MDCFoundation.                                                        |
| `icon`                    | `ReactNode`                                       | Instance of an Icon Component.                                                                     |
| `label`                   | `string`                                          | Text for your Chip.                                                                                |
| `onInteraction`           | `(evt: ChipEvolutionOnInteractionEventT) => void` | A callback for click or enter key. This should be used over onClick for accessibility reasons.     |
| `onRemove`                | `(evt: ChipEvolutionOnRemoveEventT) => void`      | A callback that is fired once the chip is in an exited state from removing it.                     |
| `selected`                | `boolean`                                         | Makes the Chip appear selected.                                                                    |
| `trailingIcon`            | `ReactNode`                                       | Instance of an Icon Component.                                                                     |
| `trailingIconRemovesChip` | `boolean`                                         | Defaults to true. Set this to false if your trailing icon is something other than a remove button. |

## ChipSetEvolution

A container for multiple chips.

### Props

| Name             | Type      | Description                                                                                                     |
| ---------------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| `action`         | `boolean` | Creates a action chipset.                                                                                       |
| `filter`         | `boolean` | Creates a filter chipset.                                                                                       |
| `input`          | `boolean` | Creates a input chipset.                                                                                        |
| `multipleSelect` | `boolean` | Determines whether chipset should be multiple-select or single-select. This is only supported for filter chips. |
| `overflow`       | `boolean` | Causes the chis to overflow instead of wrap (their default behavior).                                           |
