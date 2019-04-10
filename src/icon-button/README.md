# Icon Buttons

> Icon buttons allow users to take actions, and make choices, with a single tap.

- Module **@rmwc/icon-button**
- Import styles:
  - import **'@material/icon-button/dist/mdc.icon-button.css'**
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
      'You should definitely be using RMWC for your next project! https://jamesmfriedman.github.io/rmwc/'
    )}`}
  />
</>
```

## Usage as a Toggle

To use as a toggle, specify an additional toggled on state using 'onIcon'.

```jsx
<>
  <IconButton icon="favorite_border" onIcon="favorite" />
  <IconButton icon="favorite" onIcon="favorite" disabled />
</>
```

```jsx
function Controlled() {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <>
      <IconButton
        checked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
        onIcon="star"
        icon="star_border"
      />

      <IconButton
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

## 


