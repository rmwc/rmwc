# Tooltips

Tooltips display informative text when users hover over, focus on, or tap an element.

- Module **@rmwc/tooltip**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/tooltip/styles';
  - Or include stylesheets
    - **'@material/tooltip/dist/mdc.tooltip.css'**
    - **'@rmwc/tooltip/tooltip.css'**

## Basic Usage

Wrap any component in a `Tooltip` and provide the overlay attribute. The only requirement is that is has a single React child, and that the child can accept `onMouseEnter`, `onMouseLeave`, `onFocus`, and `onClick` props. This component is not backwards compatible with the tooltip from RMWC version 8.x. For a compatible version us the `RCTooltip` component. The `RCTooltip` uses the `ReactTooltip` from 'rc-tooltip' package. This tooltip uses the standard tooltip component from Google Material for the web.

```jsx
<>
  <Tooltip overlay="Cookies">
    <IconButton icon="star_border" aria-describedby="tooltip-id" />
  </Tooltip>

  <Tooltip overlay="Pizza">
    <IconButton icon="favorite_border" />
  </Tooltip>

  <Tooltip overlay="Icecream">
    <IconButton icon="mood" />
  </Tooltip>
</>
```

## Variants

```jsx
<Tooltip overlay="Hello" open={true}>
  <IconButton icon="mood" />
</Tooltip>
```

```jsx
<Tooltip
  overlay={
    <>
      <RichTooltipTitle>Hello</RichTooltipTitle>
      <RichTooltipContent>
        I am the content of the interactive rich tooltip
      </RichTooltipContent>
      <RichTooltipActions>
        <Button>Click me</Button>
      </RichTooltipActions>
    </>
  }
>
  <span role="button">
    Popover with clickable content that stays open on hover
  </span>
</Tooltip>
```

```jsx
<Tooltip
  overlay={
    <SimpleRichTooltip
      title="My title"
      body="I am the content"
      actions={<Button>Click me</Button>}
    />
  }
>
  <span role="button">Usage of SimpleRichTooltip</span>
</Tooltip>
```

```jsx
<Tooltip
  overlay={
    <SimpleRichTooltip
      title="My title"
      body={
        <RichTooltipLink href="/" target="_blank">
          Link
        </RichTooltipLink>
      }
    />
  }
>
  <span role="button">With links</span>
</Tooltip>
```

```jsx
<Tooltip
  overlay={<RichTooltipContent>I am persistent</RichTooltipContent>}
  isPersistent
>
  <span role="button">Popover when I am clicked</span>
</Tooltip>
```

```jsx
<Tooltip
  overlay={<RichTooltipContent>I don't stay open</RichTooltipContent>}
  stayOpenOnHover={false}
>
  <span role="button">I don't stay open</span>
</Tooltip>
```

```jsx
<Tooltip
  rich={false}
  overlay={
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
      Hello world
    </div>
  }
>
  <span role="button">Popover Window</span>
</Tooltip>
```

```jsx
<>
  <Tooltip overlay="Cookies" enterDelay={1000}>
    <Button label="Enter Delay" />
  </Tooltip>

  <Tooltip overlay="Pizza" leaveDelay={1000}>
    <Button label="Leave Delay" />
  </Tooltip>

  <Tooltip overlay="Icecream" enterDelay={1000} leaveDelay={1000}>
    <Button label="Both" />
  </Tooltip>
</>
```

```jsx
<>
  <Tooltip overlay="Align start" align="start">
    <IconButton icon="trip_origin" />
  </Tooltip>
  <Tooltip overlay="Align center" align="center">
    <IconButton icon="trip_origin" />
  </Tooltip>
  <Tooltip overlay="Align end" align="end">
    <IconButton icon="trip_origin" />
  </Tooltip>
  <Tooltip overlay="Align above" align="above">
    <IconButton icon="trip_origin" />
  </Tooltip>
  <Tooltip overlay="Align below" align="below">
    <IconButton icon="trip_origin" />
  </Tooltip>
</>
```

## Activation

By default, tooltips will activate on hover and focus. You can change this behavior by passing one or more options to the `activateOn` prop.

```jsx
<>
  <Tooltip overlay="Cookies" activateOn="hover">
    <Button label="Hover" />
  </Tooltip>
  <Tooltip overlay="Pizza" activateOn="click" isPersistent>
    <Button label="Click" />
  </Tooltip>
  <Tooltip overlay="Icecream" activateOn="focus">
    <Button label="Focus" />
  </Tooltip>
  <Tooltip overlay="Cake" activateOn={['hover', 'focus']}>
    <Button label="Multiple" />
  </Tooltip>
</>
```

## Usage with RMWCProvider

The RMWCProvider allows you to specify global defaults for your tooltips.

```jsx
<RMWCProvider
  tooltip={{
    align: 'right',
    activateOn: 'hover',
    leaveDelay: 500,
    enterDelay: 0
  }}
>
  <Tooltip overlay="Hello World!">
    <Button label="With Provider" />
  </Tooltip>
</RMWCProvider>
```

## Tooltip

A Tooltip component for displaying informative popover information.

### Props

| Name         | Type                                         | Description                                                        |
| ------------ | -------------------------------------------- | ------------------------------------------------------------------ |
| `activateOn` | `TooltipActivationT \| TooltipActivationT[]` | Activate the tooltip through one or more interactions. Defaults to |

`['hover', 'focus']`
. |
| `align` | `TooltipAlignT` | How to align the tooltip. |
| `anchorBoundaryType` | `AnchorBoundaryType` | Specify whether the anchor element is bounded (element has an identifiable boundary such as a button) or unbounded (element does not have a visually declared boundary such as a text link). |
| `children` | `ReactNode` | The children that the tooltip belongs to. Must be a single React element. |
| `className` | `string` | Custom className to add to the tooltip overlay container. |
| `enterDelay` | `number` | Delay in milliseconds before showing the tooltip when interacting via touch or mouse. |
| `isPersistent` | `boolean` | Specify whether tooltip should be persistent. Persistent tooltip are triggered by clicks. |
| `leaveDelay` | `number` | Delay in milliseconds before hiding the tooltip when interacting via touch or mouse. |
| `open` | `boolean` | Manually control the open state |
| `overlay` | `ReactNode` | The overlay for the tooltip. |
| `rich` | `boolean` | Manually disable a tooltip being rich. This is useful when a custom overlay is needed. Defaults to true when content is a ReactNode. |
| `stayOpenOnHover` | `boolean` | Control whether to stay open on hover. This is useful for interactive tooltips. |
