# Segmented Button

> Segmented buttons allow users to toggle the selected states of grouped buttons.

-   Module __@rmwc/segmented-button__
-   Import styles:
    -   Using CSS Loader
        -   import __'@rmwc/segmented-button/styles';__
    -   Or include stylesheets
        -   __'@material/segmented-button/dist/mdc.segmented-button.css'__;
        -   __'@rmwc/@rmwc/icon/icon.css'__;
        -   __'@material/ripple/dist/mdc.ripple.css'__;
-   MDC Docs: [https://material.io/develop/web/components/segmented-button/](https://material.io/develop/web/components/segmented-button/)

Default Multiple Select

```js

function Example() {

  const \[selected, setSelected\] \= React.useState({

    cookies: false,

    pizza: false,

    icecream: false

  });

  const toggleSelected \= (key) \=>

    setSelected({ ...selected, \[key\]: !selected\[key\] });

  return (

    <SegmentedButton\>

      <Segment

        icon\="favorite"

        value\="cookies"

        onClick\={() \=> toggleSelected('cookies')}

        selected\={selected.cookies}

      />

      <Segment

        label\="Button"

        value\="pizza"

        onClick\={() \=> toggleSelected('pizza')}

        selected\={selected.pizza}

      />

      <Segment

        icon\="favorite"

        label\="Button"

        value\="icecream"

        onClick\={() \=> toggleSelected('icecream')}

        selected\={selected.icecream}

      />

    </SegmentedButton\>

  );

}


```

Single selectable

```js

function Example() {

  const \[selected, setSelected\] \= React.useState('icecream');

  return (

    <SegmentedButton selectType\="single"\>

      <Segment

        icon\="favorite"

        value\="cookies"

        onClick\={(evt) \=> setSelected(evt.currentTarget.value)}

        selected\={selected \=== 'cookies'}

      />

      <Segment

        label\="Button"

        value\="pizza"

        onClick\={(evt) \=> setSelected(evt.currentTarget.value)}

        selected\={selected \=== 'pizza'}

      />

      <Segment

        icon\="favorite"

        label\="Button"

        value\="icecream"

        onClick\={(evt) \=> setSelected(evt.currentTarget.value)}

        selected\={selected \=== 'icecream'}

      />

    </SegmentedButton\>

  );

}


```

Touch Target Wrapper

```js

<\>

  {/\*\* Wrapping a button in TouchTargetWrapper will automatically set its \`touch\` prop to true. \*/}

  <TouchTargetWrapper\>

    <Segment\>Touch Accessible</Segment\>

  </TouchTargetWrapper\>

</\>


```

## SegmentedButton