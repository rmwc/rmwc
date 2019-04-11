# Elevation

> Elevation is the relative distance between two surfaces along the z-axis.

- Module **@rmwc/elevation**
- Import styles:
  - import **'@material/elevation/dist/mdc.elevation.css'**
- MDC Docs: [https://material.io/develop/web/components/elevation/](https://material.io/develop/web/components/elevation/)

```jsx
<>
  {Array(25)
    .fill(undefined)
    .map((val, i) => (
      <Elevation z={i} key={i}>
        {i}dp
      </Elevation>
    ))}
</>
```

```jsx
function Example() {
  const [elevation, setElevation] = React.useState(0);

  return (
    <Elevation
      z={elevation}
      transition
      onMouseOver={() => setElevation(24)}
      onMouseOut={() => setElevation(0)}
    >
      Hover Me {elevation}dp
    </Elevation>
  );
}
```

## Wrapping Children

You can avoid adding extra DOM nodes by using the `wrap` prop on elevation. This will apply the classes directly to the child component. Additionally, Elevation is simply a `className`, so you can achieve the same effect by adding `className="mdc-elevation--z15"`.

```jsx
<Elevation z={21} wrap>
  <span>Wrapped!</span>
</Elevation>
```

## Elevation
The Elevation Component

### Props

| Name | Type | Description |
|------|------|-------------|
| `transition` | `undefined | false | true` | Allows for smooth transitions between elevations when the z value changes. |
| `wrap` | `undefined | false | true` | Allows the elevation classes to be merged onto the child component instead of creating an new DOM node. |
| `z` | `number | string` | A number from 0 - 24 for different levels of elevation |


