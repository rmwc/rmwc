# Circular Progress `RMWC ADDON`

Circular progress indicators display progress by animating an indicator along an invisible circular track in a clockwise direction. They can be applied directly to a surface, such as a button or card.

- Module **@rmwc/circular-progress**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/circular-progress/styles';
  - Or include stylesheets
    - **'@rmwc/circular-progress/circular-progress.css'**


## Basic Usage

```jsx
<CircularProgress />
```

```jsx
<>
  <CircularProgress progress={0.3} />
  <CircularProgress progress={0.6} />
  <CircularProgress progress={0.9} />
</>
```

## Sizing

```jsx
<>
  <CircularProgress size="xsmall" />
  <CircularProgress size="small" />
  <CircularProgress size="medium" />
  <CircularProgress size="large" />
  <CircularProgress size="xlarge" />
  <CircularProgress size={72} />
</>
```

## Usage with other components

```jsx
<>
  <Button
    icon={<CircularProgress theme="secondary" />}
    label="Cookies"
  />

  <List>
    <SimpleListItem graphic={<CircularProgress />} text="Pizza" />
    <SimpleListItem graphic="favorite" text="Icecream" />
  </List>

  <Chip icon={<CircularProgress />} label="Donuts" />
</>
```

## CircularProgress
A Circular Progress indicator.

### Props

| Name | Type | Description |
|------|------|-------------|
| `max` | `undefined \| number` | Max value for determinate progress bars. |
| `min` | `undefined \| number` | Min value for determinate progress bars. |
| `progress` | `undefined \| number` | Value for determinate progress bars. |
| `size` | `"xsmall" \| "small" \| "medium" \| "large" \| "xlarge" \| number` | The size of the loader you would like to render. |


