# Tooltips

> Tooltips display informative text when users hover over, focus on, or tap an element.

-   Module __@rmwc/tooltip__
-   Import styles:
    -   Using CSS Loader
        -   import __'@rmwc/tooltip/styles';__
    -   Or include stylesheets
        -   __'@material/tooltip/dist/mdc.tooltip.css'__;
        -   __'@rmwc/tooltip/tooltip.css'__;

## Basic Usage

Wrap any component in a `Tooltip` and provide the overlay attribute. The only requirement is that is has a single React child, and that the child can accept `onMouseEnter`, `onMouseLeave`, `onFocus`, and `onClick` props. This component is not backwards compatible with the tooltip from RMWC version 8.x. For a compatible version us the `RCTooltip` component. The `RCTooltip` uses the `ReactTooltip` from 'rc-tooltip' package. This tooltip uses the standard tooltip component from Google Material for the web.

Default

```js

<\>

  <Tooltip overlay\="Cookies"\>

    <IconButton icon\="star\_border" aria-describedby\="tooltip-id" />

  </Tooltip\>

  <Tooltip overlay\="Pizza"\>

    <IconButton icon\="favorite\_border" />

  </Tooltip\>

  <Tooltip overlay\="Icecream"\>

    <IconButton icon\="mood" />

  </Tooltip\>

</\>


```

## Variants

Controlled / Always open

```js

<Tooltip overlay\="Hello" open\={true}\>

  <IconButton icon\="mood" />

</Tooltip\>


```

Rich overlay with clickable content

```js

<Tooltip

  overlay\={

    <\>

      <RichTooltipTitle\>Hello</RichTooltipTitle\>

      <RichTooltipContent\>

        I am the content of the interactive rich tooltip

      </RichTooltipContent\>

      <RichTooltipActions\>

        <Button\>Click me</Button\>

      </RichTooltipActions\>

    </\>

  }

\>

  <span role\="button"\>

    Popover with clickable content that stays open on hover

  </span\>

</Tooltip\>


```

SimpleRichTooltip

```js

<Tooltip

  overlay\={

    <SimpleRichTooltip

      title\="My title"

      body\="I am the content"

      actions\={<Button\>Click me</Button\>}

    />

  }

\>

  <span role\="button"\>Usage of SimpleRichTooltip</span\>

</Tooltip\>


```

With links

```js

<Tooltip

  overlay\={

    <SimpleRichTooltip

      title\="My title"

      body\={

        <RichTooltipLink href\="/" target\="\_blank"\>

          Link

        </RichTooltipLink\>

      }

    />

  }

\>

  <span role\="button"\>With links</span\>

</Tooltip\>


```

Persistent

```js

<Tooltip

  overlay\={<RichTooltipContent\>I am persistent</RichTooltipContent\>}

  isPersistent

\>

  <span role\="button"\>Popover when I am clicked</span\>

</Tooltip\>


```

Disable staying open on hover

```js

<Tooltip

  overlay\={<RichTooltipContent\>I don't stay open</RichTooltipContent\>}

  stayOpenOnHover\={false}

\>

  <span role\="button"\>I don't stay open</span\>

</Tooltip\>


```

Styled Content

```js

<Tooltip

  rich\={false}

  overlay\={

    <div

      style\={{

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

    \>

      Hello world

    </div\>

  }

\>

  <span role\="button"\>Popover Window</span\>

</Tooltip\>


```

Delay

```js

<\>

  <Tooltip overlay\="Cookies" enterDelay\={1000}\>

    <Button label\="Enter Delay" />

  </Tooltip\>

  <Tooltip overlay\="Pizza" leaveDelay\={1000}\>

    <Button label\="Leave Delay" />

  </Tooltip\>

  <Tooltip overlay\="Icecream" enterDelay\={1000} leaveDelay\={1000}\>

    <Button label\="Both" />

  </Tooltip\>

</\>


```

Alignment

```js

<\>

  <Tooltip overlay\="Align start" align\="start"\>

    <IconButton icon\="trip\_origin" />

  </Tooltip\>

  <Tooltip overlay\="Align center" align\="center"\>

    <IconButton icon\="trip\_origin" />

  </Tooltip\>

  <Tooltip overlay\="Align end" align\="end"\>

    <IconButton icon\="trip\_origin" />

  </Tooltip\>

  <Tooltip overlay\="Align above" align\="above"\>

    <IconButton icon\="trip\_origin" />

  </Tooltip\>

  <Tooltip overlay\="Align below" align\="below"\>

    <IconButton icon\="trip\_origin" />

  </Tooltip\>

</\>


```

## Activation

By default, tooltips will activate on hover and focus. You can change this behavior by passing one or more options to the `activateOn` prop.

Default

```js

<\>

  <Tooltip overlay\="Cookies" activateOn\="hover"\>

    <Button label\="Hover" />

  </Tooltip\>

  <Tooltip overlay\="Pizza" activateOn\="click" isPersistent\>

    <Button label\="Click" />

  </Tooltip\>

  <Tooltip overlay\="Icecream" activateOn\="focus"\>

    <Button label\="Focus" />

  </Tooltip\>

  <Tooltip overlay\="Cake" activateOn\={\['hover', 'focus'\]}\>

    <Button label\="Multiple" />

  </Tooltip\>

</\>


```

## Usage with RMWCProvider

The RMWCProvider allows you to specify global defaults for your tooltips.

Using Provider

```js

<RMWCProvider

  tooltip\={{

    align: 'right',

    activateOn: 'hover',

    leaveDelay: 500,

    enterDelay: 0

  }}

\>

  <Tooltip overlay\="Hello World!"\>

    <Button label\="With Provider" />

  </Tooltip\>

</RMWCProvider\>


```

## Tooltip