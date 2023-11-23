RC Tooltips`RMWC ADDON`
=======================

> Tooltips display informative text when users hover over, focus on, or tap an element.

*   Module **@rmwc/rc-tooltip**
*   Import styles:
    *   Using CSS Loader
        *   import **'@rmwc/rc-tooltip/styles';**
    *   Or include stylesheets
        *   **'@rmwc/rc-tooltip/tooltip.css'**;

Basic Usage
-----------

Wrap any component in a `RCTooltip` and provide the content attribute. The only requirement is that is has a single React child, and that the child can accept `onMouseEnter`, `onMouseLeave`, `onFocus`, and `onClick` props. This is not the standard Google Material for the web component, it is here for backwards compability. Use `Tooltip` to use the standard Google Material for the web component.

Default

```js

<\>

  <RCTooltip content\="Cookies"\>

    <IconButton icon\="star\_border" />

  </RCTooltip\>

  <RCTooltip content\="Pizza"\>

    <IconButton icon\="favorite\_border" />

  </RCTooltip\>

  <RCTooltip content\="Icecream"\>

    <IconButton icon\="mood" />

  </RCTooltip\>

</\>


```

Variants
--------

With Arrow

```js

<RCTooltip content\="Cake" showArrow\>

  <IconButton icon\="cake" />

</RCTooltip\>


```

Controlled / Always open

```js

<RCTooltip content\="Hello" align\="right" open\={true}\>

  <IconButton icon\="mood" />

</RCTooltip\>


```

Rich Content

```js

<RCTooltip

  content\={

    <div style\={{ display: 'flex' }}\>

      <Avatar

        src\="images/avatars/captainamerica.png"

        size\="large"

        name\="Steve Rogers"

      />

      <div style\={{ marginLeft: '0.5rem' }}\>

        <b\>Captain America</b\>

        <div\>Steve Rogers</div\>

      </div\>

    </div\>

  }

\>

  <span role\="button"\>S. Rogers</span\>

</RCTooltip\>


```

Styled content

```js

<RCTooltip

  /\*\* You make something like a popover window by just styling your inner content. \*/

  content\={

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

      Hello World!

    </div\>

  }

\>

  <span role\="button"\>Popover Window</span\>

</RCTooltip\>


```

Delay

```js

<\>

  <RCTooltip content\="Cookies" enterDelay\={1000}\>

    <Button label\="Enter Delay" />

  </RCTooltip\>

  <RCTooltip content\="Pizza" leaveDelay\={1000}\>

    <Button label\="Leave Delay" />

  </RCTooltip\>

  <RCTooltip content\="Icecream" enterDelay\={1000} leaveDelay\={1000}\>

    <Button label\="Both" />

  </RCTooltip\>

</\>


```

Alignment

```js

function AlignmentExample() {

  return \[

    'left',

    'right',

    'top',

    'bottom',

    'topLeft',

    'topRight',

    'bottomLeft',

    'bottomRight'

  \].map((align) \=> (

    <RCTooltip key\={align} content\={\`Align: ${align}\`} align\={align}\>

      <IconButton icon\="trip\_origin" />

    </RCTooltip\>

  ));

}


```

Activation
----------

By default, tooltips will activate on hover and focus. You can change this behavior by passing one or more options to the `activateOn` prop.

Default

```js

<\>

  <RCTooltip content\="Cookies" activateOn\="hover"\>

    <Button label\="Hover" />

  </RCTooltip\>

  ''

  <RCTooltip content\="Pizza" activateOn\="click"\>

    <Button label\="Click" />

  </RCTooltip\>

  <RCTooltip content\="Icecream" activateOn\="focus"\>

    <Button label\="Focus" />

  </RCTooltip\>

  <RCTooltip content\="Cake" activateOn\={\['hover', 'focus'\]}\>

    <Button label\="Multiple" />

  </RCTooltip\>

</\>


```

Usage with RMWCProvider
-----------------------

The RMWCProvider allows you to specify global defaults for your tooltips.

Using Provider

```js

<RMWCProvider

  tooltip\={{

    align: 'right',

    activateOn: 'hover',

    showArrow: true,

    leaveDelay: 500,

    enterDelay: 0

  }}

\>

  <RCTooltip content\="Hello World!"\>

    <Button label\="With Provider" />

  </RCTooltip\>

</RMWCProvider\>


```

Tooltip
-------