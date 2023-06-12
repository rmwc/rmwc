# Chips

Chips represent complex entities in small blocks, such as a contact.

- Module **@rmwc/chip**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/chip/styles';
  - Or include stylesheets
    - **'@material/chips/dist/mdc.chips.css'**
    - **'@rmwc/icon/icon.css'**
    - **'@material/ripple/dist/mdc.ripple.css'**
- MDC Docs: [https://material.io/develop/web/components/chips/](https://material.io/develop/web/components/chips/)

```jsx
<ChipSet>
  <Chip selected label="Cookies" />
  <Chip label="Pizza" />
  <Chip label="Icecream" />
</ChipSet>
```

```jsx
<ChipSet>
  <Chip icon="favorite" label="Cookies" trailingIcon="close" />
</ChipSet>
```

```jsx
<>
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
</>
```

```jsx
<ChipSet>
  <Chip label="Cookies" disabled />
</ChipSet>
```

## Layout grid chip sets / Listbox chip sets

Chip sets have two varieties: layout grid chip sets and listbox chip sets.

Layout grid chip sets follow the layout grid interaction pattern. They contain either action chips or input chips.

Listbox chip sets follow the follow the listbox interaction pattern They contain filter chips chips.

```jsx
<>
  {function Example() {
    const [selected, setSelected] = React.useState({
      cookies: false,
      pizza: false,
      icecream: false
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
}
```

```jsx
<>
  {function Example() {
    const [selected, setSelected] = React.useState({
      cookies: false,
      pizza: false,
      icecream: false
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
}
```

## Chip

A Chip component.

### Props

| Name                      | Type                                                  | Description                                                                                                                                  |
| ------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `checkmark`               | `undefined \| false \| true`                          | Includes an optional checkmark for the chips selected state.                                                                                 |
| `children`                | `React.ReactNode`                                     | Additional children will be rendered in the text area.                                                                                       |
| `foundationRef`           | `React.Ref<MDCChipFoundation>`                        | Advanced: A reference to the MDCFoundation.                                                                                                  |
| `icon`                    | `RMWC.IconPropT`                                      | Instance of an Icon Component.                                                                                                               |
| `id`                      | `undefined \| string`                                 | An optional chip ID that will be included in callback evt.detail. If this is not passed, RMWC will attempt to use the "key" prop if present. |
| `label`                   | `undefined \| string`                                 | Text for your Chip.                                                                                                                          |
| `onInteraction`           | `undefined \| (evt: ChipOnInteractionEventT) => void` | A callback for click or enter key. This should be used over onClick for accessibility reasons.                                               |
| `onRemove`                | `undefined \| (evt: ChipOnRemoveEventT) => void`      | A callback that is fired once the chip is in an exited state from removing it.                                                               |
| `selected`                | `undefined \| false \| true`                          | makes the Chip appear selected.                                                                                                              |
| `trailingIcon`            | `RMWC.IconPropT`                                      | Instance of an Icon Component.                                                                                                               |
| `trailingIconRemovesChip` | `undefined \| false \| true`                          | Defaults to true. Set this to false if your trailing icon is something other than a remove button.                                           |

## ChipSet

A container for multiple chips.

### Props

| Name       | Type                         | Description                                                           |
| ---------- | ---------------------------- | --------------------------------------------------------------------- |
| `overflow` | `undefined \| false \| true` | Causes the chis to overflow instead of wrap (their default behavior). |
| `role`     | `"grid" \| "listbox"`        |                                                                       |
