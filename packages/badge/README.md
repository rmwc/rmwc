# Badges `RMWC ADDON`

Badges are small status descriptors for UI elements. A badge consists of a small circle, typically containing a number or other short set of characters, that appears in proximity to another object.

- Module **@rmwc/badge**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/badge/styles';
  - Or include stylesheets
    - **'@rmwc/badge/badge.css'**

```jsx
<Badge align="inline" />
```

```jsx
<>
  <Badge align="inline" label={20} />
  <Badge align="inline" label="99+" />
  <Badge align="inline" label="New" />
</>
```

```jsx
<>
  <Badge theme={['primaryBg', 'onPrimary']} align="inline" />
  <Badge style={{ background: 'hotpink' }} align="inline" />
  <Badge theme={['secondaryBg', 'onSecondary']} align="inline" label="Theme" />
</>
```

## Usage with other components

The badge component has been designed to play well with the majority of components in RMWC. You can place it inside of any component that accepts children and its default position will be absolute to the top end corner.

Because passing a Badge as a child doesn't always work (for things like `overflow: hidden` elements), you can use the `BadgeAnchor` component. This is really just a div with `position: relative` and some other sensible layout properties set on it, so you can use this or your own CSS to achieve the same result. Additionally, exact positioning is highly dependent on your design and shape of your components. Badges provide an `inset` property that allows you to adjust the positioning of the Badge as necessary.

```jsx
<>
  <BadgeAnchor>
    <Button raised label="Button" />
    <Badge />
  </BadgeAnchor>

  <BadgeAnchor>
    <Button raised label="Button" theme={['secondaryBg', 'onSecondary']} />
    <Badge style={{ background: 'hotpink' }} label="Hello" />
  </BadgeAnchor>
</>
```

```jsx
<BadgeAnchor>
  <IconButton icon="notifications" />
  <Badge inset="0.75rem" />
</BadgeAnchor>
```

```jsx
<>
  <BadgeAnchor>
    <Avatar src="images/avatars/ironman.png" size="large" name="Tony Stark" />
    <Badge inset="5px" />
  </BadgeAnchor>

  <BadgeAnchor>
    <Avatar
      src="images/avatars/blackwidow.png"
      size="large"
      name="Natalia Alianovna Romanova"
      square
    />
    <Badge />
  </BadgeAnchor>
</>
```

## Alignment

Badges can be aligned to the start, end, or use inline alignment. They are also RTL aware. They default to align end.

```jsx
<>
  <BadgeAnchor>
    <Button raised label="Align Start" />
    <Badge align="start" />
  </BadgeAnchor>

  <BadgeAnchor>
    <Button raised label="Align End" />
    <Badge align="end" />
  </BadgeAnchor>
</>
```

## Transitions

You can transition between the standalone indicator and a badge with content. The badge will consider any `label` other than null or undefined as valid content.

```jsx
function Example() {
  const [label, setLabel] = React.useState(undefined);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      switch (label) {
        case '99+':
          setLabel(undefined);
          break;
        case '':
          setLabel('99+');
          break;
        case undefined:
          setLabel('');
          break;
      }
    }, 1800);

    return () => clearTimeout(timeout);
  }, [label]);

  return (
    <BadgeAnchor>
      <Button raised label="Button" />
      <Badge label={label} exited={label === undefined} />
    </BadgeAnchor>
  );
}
```

## Badge

A Badge component for indicating alerts or counts.

### Props

| Name     | Type                           | Description                                                                                               |
| -------- | ------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `align`  | `"end" \| "start" \| "inline"` | How to align the badge.                                                                                   |
| `exited` | `boolean`                      | Animates the badge out of view. When this class is removed, the badge will return to view.                |
| `inset`  | `string \| number`             | A value to inset the badge alignment by, useful for positioning the badge on different shaped components. |
| `label`  | `ReactNode`                    | A label or count for the badge.                                                                           |

## BadgeAnchor

An anchor component for badges.
