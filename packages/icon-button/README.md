# Icon Buttons

Icon buttons allow users to take actions, and make choices, with a single tap.

- Module **@rmwc/icon-button**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/icon-button/styles';
  - Or include stylesheets
    - **'@material/icon-button/dist/mdc.icon-button.css'**
    - **'@rmwc/icon/icon.css'**
    - **'@material/ripple/dist/mdc.ripple.css'**
- MDC Docs: [https://material.io/develop/web/components/buttons/icon-buttons/](https://material.io/develop/web/components/buttons/icon-buttons/)

## Basic Usage

`IconButton` inherits from the `Icon` component and can be passed icons in the same way.

```jsx
<>
  <IconButton icon="star" label="Rate this!" />

  <IconButton icon="favorite" label="Favorite" disabled />

  <IconButton
    icon="images/icons/twitter.png"
    aria-label="Tweet it!"
    tag="a"
    target="_blank"
    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
      'You should definitely be using RMWC for your next project! https://rmwc.io'
    )}`}
  />
</>
```

## Usage as a Toggle

To use as a toggle, specify an additional toggled on state using 'onIcon'.

```jsx
<>
  <IconButton aria-label="favorite" icon="favorite_border" onIcon="favorite" />
  <IconButton
    aria-label="favorite"
    icon="favorite"
    onIcon="favorite"
    disabled
  />
</>
```

```jsx
function Controlled() {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <>
      <IconButton
        aria-label="start"
        checked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
        onIcon="star"
        icon="star_border"
      />

      <IconButton
        aria-label="social media"
        checked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
        onIcon="images/icons/twitter.png"
        icon="images/icons/facebook.png"
      />
    </>
  );
}
```

```jsx
<IconButton
  aria-label="red and green"
  onIcon={
    <div
      style={{
        background: 'red',
        width: '24px',
        height: '24px'
      }}
    />
  }
  icon={
    <div
      style={{
        background: 'green',
        width: '24px',
        height: '24px',
        borderRadius: '50%'
      }}
    />
  }
/>
```

## IconButton

An IconButton component that can also be used as a toggle.

### Props

| Name            | Type                                      | Description                                                                       |
| --------------- | ----------------------------------------- | --------------------------------------------------------------------------------- |
| `checked`       | `boolean`                                 | Controls the on / off state of the a toggleable button.                           |
| `disabled`      | `boolean`                                 | Makes the button disabled                                                         |
| `foundationRef` | `Ref<MDCIconButtonToggleFoundation<>>`    | Advanced: A reference to the MDCFoundation. Only for Toggleable buttons.          |
| `icon`          | `IconPropT`                               | Icon for the button                                                               |
| `label`         | `string`                                  | Apply an aria label.                                                              |
| `onChange`      | `(evt: IconButtonOnChangeEventT) => void` | An onChange callback that receives a custom event. evt.detail = { isOn: boolean } |
| `onIcon`        | `IconPropT`                               | If specified, renders a toggle with this icon as the on state.                    |
| `ripple`        | `RipplePropT`                             | Adds a ripple effect to the component                                             |
