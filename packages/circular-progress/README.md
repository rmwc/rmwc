# Circular Progress

Circular progress indicators display progress by animating an indicator along an invisible circular track in a clockwise direction. They can be applied directly to a surface, such as a button or card.

- Module **@rmwc/circular-progress**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/circular-progress/styles';
  - Or include stylesheets
    - **'@rmwc/circular-progress/circular-progress.css'**

## Basic Usage

```jsx
<CircularProgress label="progress" />
```

```jsx
<>
  <CircularProgress label="progress" progress={0.3} />
  <CircularProgress label="progress" progress={0.6} />
  <CircularProgress label="progress" progress={0.9} />
  <CircularProgress label="progress" progress={1} />
</>
```

## Sizing

```jsx
<>
  <CircularProgress label="xsmall progress" size="xsmall" />
  <CircularProgress label="small progress" size="small" />
  <CircularProgress label="medium progress" size="medium" />
  <CircularProgress label="large progress" size="large" />
  <CircularProgress label="xlarge progress" size="xlarge" />
  <CircularProgress label="progress" size={72} />
</>
```

## Usage with other components

```jsx
<>
  <Button
    icon={<CircularProgress label="progress" theme="secondary" />}
    label="Cookies"
  />

  <List>
    <SimpleListItem
      graphic={<CircularProgress label="progress" />}
      text="Pizza"
    />
    <SimpleListItem graphic="favorite" text="Icecream" />
  </List>

  <ChipSet>
    <Chip
      icon={<CircularProgress label="progress" size="xsmall" />}
      label="Donuts"
    />
  </ChipSet>
</>
```

## CircularProgress

A Circular Progress indicator.

### Props

| Name       | Type             | Description                                                                              |
| ---------- | ---------------- | ---------------------------------------------------------------------------------------- |
| `closed`   | `boolean`        | Hides the progress bar. Adding / removing this prop will trigger an animation in or out. |
| `label`    | `string`         | The label which will set an aria-label.                                                  |
| `max`      | `number`         | Max value for determinate progress bars.                                                 |
| `min`      | `number`         | Min value for determinate progress bars.                                                 |
| `progress` | `number`         | Value for determinate progress bars.                                                     |
| `size`     | `number \| Size` | The size of the loader you would like to render.                                         |
