# Tooltips `RMWC ADDON`

Tooltips display informative text when users hover over, focus on, or tap an element.

- Module **@rmwc/rc-tooltip**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/rc-tooltip/styles';
  - Or include stylesheets
    - **'@rmwc/rc-tooltip/tooltip.css'**


## Basic Usage

Wrap any component in a `Tooltip` and provide the content attribute. The only requirement is that is has a single React child, and that the child can accept `onMouseEnter`, `onMouseLeave`, `onFocus`, and `onClick` props.

```jsx
<>
  <RCTooltip content="Cookies">
    <IconButton icon="star_border" />
  </RCTooltip>

  <RCTooltip content="Pizza">
    <IconButton icon="favorite_border" />
  </RCTooltip>

  <RCTooltip content="Icecream">
    <IconButton icon="mood" />
  </RCTooltip>
</>
```

## Variants

```jsx
<RCTooltip content="Cake" showArrow>
  <IconButton icon="cake" />
</RCTooltip>
```

```jsx
<RCTooltip content="Hello" align="right" open={true}>
  <IconButton icon="mood" />
</RCTooltip>
```

```jsx
<RCTooltip
  content={
    <div style={{ display: 'flex' }}>
      <Avatar
        src="images/avatars/captainamerica.png"
        size="large"
        name="Steve Rogers"
      />
      <div style={{ marginLeft: '0.5rem' }}>
        <b>Captain America</b>
        <div>Steve Rogers</div>
      </div>
    </div>
  }
>
  <span role="button">S. Rogers</span>
</RCTooltip>
```

```jsx
<RCTooltip
  /** You make something like a popover window by just styling your inner content. */
  content={
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'white',
        width: '20rem',
        height: '8rem',
        color: 'black',
        borderRadius: '3px',
        margin: '0 -3px'
      }}
    >
      Hello World!
    </div>
  }
>
  <span role="button">Popover Window</span>
</RCTooltip>
```

```jsx
<>
  <RCTooltip content="Cookies" enterDelay={1000}>
    <Button label="Enter Delay" />
  </RCTooltip>

  <RCTooltip content="Pizza" leaveDelay={1000}>
    <Button label="Leave Delay" />
  </RCTooltip>

  <RCTooltip content="Icecream" enterDelay={1000} leaveDelay={1000}>
    <Button label="Both" />
  </RCTooltip>
</>
```

```jsx
function AlignmentExample() {
  return [
    'left',
    'right',
    'top',
    'bottom',
    'topLeft',
    'topRight',
    'bottomLeft',
    'bottomRight'
  ].map((align) => (
    <RCTooltip key={align} content={`Align: ${align}`} align={align}>
      <IconButton icon="trip_origin" />
    </RCTooltip>
  ));
}
```

## Activation

By default, tooltips will activate on hover and focus. You can change this behavior by passing one or more options to the `activateOn` prop.

```jsx
<>
  <RCTooltip content="Cookies" activateOn="hover">
    <Button label="Hover" />
  </RCTooltip>
  ''
  <RCTooltip content="Pizza" activateOn="click">
    <Button label="Click" />
  </RCTooltip>
  <RCTooltip content="Icecream" activateOn="focus">
    <Button label="Focus" />
  </RCTooltip>
  <RCTooltip content="Cake" activateOn={['hover', 'focus']}>
    <Button label="Multiple" />
  </RCTooltip>
</>
```

## Usage with RMWCProvider

The RMWCProvider allows you to specify global defaults for your tooltips.

```jsx
<RMWCProvider
  tooltip={{
    align: 'right',
    activateOn: 'hover',
    showArrow: true,
    leaveDelay: 500,
    enterDelay: 0
  }}
>
  <RCTooltip content="Hello World!">
    <Button label="With Provider" />
  </RCTooltip>
</RMWCProvider>
```

## Tooltip
A Tooltip component for displaying informative popover information.

### Props

| Name | Type | Description |
|------|------|-------------|
| `activateOn` | `TooltipActivationT \| TooltipActivationT[]` | Activate the tooltip through one or more interactions. Defaults to `['hover', 'focus']`. |
| `align` | `TooltipAlignT` | How to align the tooltip. Defaults to `top`. |
| `children` | `React.ReactChild` | The children that the tooltip belongs to. Must be a single React.child. |
| `className` | `undefined \| string` | Custom className to add to the tooltip overlay container. |
| `content` | `React.ReactNode` | The overlay content for the tooltip. |
| `enterDelay` | `undefined \| number` | Delay in milliseconds before showing the tooltip when interacting via touch or mouse. |
| `leaveDelay` | `undefined \| number` | Delay in milliseconds before hiding the tooltip when interacting via touch or mouse. |
| `open` | `undefined \| false \| true` | Manually control the open state |
| `showArrow` | `undefined \| false \| true` | Whether or not to show an arrow on the Tooltip. Defaults to `false`. |


