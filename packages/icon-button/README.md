# Icon Buttons

> Icon buttons allow users to take actions, and make choices, with a single tap.

-   Module __@rmwc/icon-button__
-   Import styles:
    -   Using CSS Loader
        -   import __'@rmwc/icon-button/styles';__
    -   Or include stylesheets
        -   __'@material/icon-button/dist/mdc.icon-button.css'__;
        -   __'@rmwc/icon/icon.css'__;
        -   __'@material/ripple/dist/mdc.ripple.css'__;
-   MDC Docs: [https://material.io/develop/web/components/buttons/icon-buttons/](https://material.io/develop/web/components/buttons/icon-buttons/)

## Basic Usage

`IconButton` inherits from the `Icon` component and can be passed icons in the same way.

Default

```js

<\>

  <IconButton icon\="star" label\="Rate this!" />

  <IconButton icon\="favorite" label\="Favorite" disabled />

  <IconButton

    icon\="images/icons/twitter.png"

    aria-label\="Tweet it!"

    tag\="a"

    target\="\_blank"

    href\={\`https://twitter.com/intent/tweet?text=${encodeURIComponent(

      'You should definitely be using RMWC for your next project! https://rmwc.io'

    )}\`}

  />

</\>


```

## Usage as a Toggle

To use as a toggle, specify an additional toggled on state using 'onIcon'.

Uncontrolled

```js

<\>

  <IconButton icon\="favorite\_border" onIcon\="favorite" />

  <IconButton icon\="favorite" onIcon\="favorite" disabled />

</\>


```

Controlled

```js

function Controlled() {

  const \[isChecked, setIsChecked\] \= React.useState(false);

  return (

    <\>

      <IconButton

        checked\={isChecked}

        onClick\={() \=> setIsChecked(!isChecked)}

        onIcon\="star"

        icon\="star\_border"

      />

      <IconButton

        checked\={isChecked}

        onClick\={() \=> setIsChecked(!isChecked)}

        onIcon\="images/icons/twitter.png"

        icon\="images/icons/facebook.png"

      />

    </\>

  );

}


```

Component as Icon

```js

<IconButton

  onIcon\={

    <div

      style\={{

        background: 'red',

        width: '24px',

        height: '24px'

      }}

    />

  }

  icon\={

    <div

      style\={{

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