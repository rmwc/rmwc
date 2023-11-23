# Chips

> Chips represent complex entities in small blocks, such as a contact.

-   Module __@rmwc/chip__
-   Import styles:
    -   Using CSS Loader
        -   import __'@rmwc/chip/styles';__
    -   Or include stylesheets
        -   __'@material/chips/dist/mdc.chips.css'__;
        -   __'@rmwc/icon/icon.css'__;
        -   __'@material/ripple/dist/mdc.ripple.css'__;
-   MDC Docs: [https://material.io/develop/web/components/chips/](https://material.io/develop/web/components/chips/)

Default

```js

<ChipSet\>

  <Chip selected label\="Cookies" />

  <Chip label\="Pizza" />

  <Chip label\="Icecream" />

</ChipSet\>


```

With Icons

```js

<ChipSet\>

  <Chip icon\="favorite" label\="Cookies" trailingIcon\="close" />

</ChipSet\>


```

Event Handling

```js

function Example() {

  const \[selected, setSelected\] \= React.useState(false);

  return (

    <ChipSet\>

      <Chip

        key\="my-chip"

        label\="Click Me"

        checkmark

        selected\={selected}

        onRemove\={(evt) \=> console.log('onRemove', evt.detail)}

        onInteraction\={(evt) \=> {

          console.log('onInteraction', evt.detail);

          setSelected(!selected);

        }}

        trailingIcon\="close"

      />

    </ChipSet\>

  );

}


```

Disabled

```js

<ChipSet\>

  <Chip label\="Cookies" disabled />

</ChipSet\>


```

## Layout grid chip sets / Listbox chip sets

Chip sets have two varieties: layout grid chip sets and listbox chip sets.

Layout grid chip sets follow the layout grid interaction pattern. They contain either action chips or input chips.

Listbox chip sets follow the follow the listbox interaction pattern They contain filter chips chips.

Grid

```js

function Example() {

  const \[selected, setSelected\] \= React.useState({

    cookies: false,

    pizza: false,

    icecream: false

  });

  const toggleSelected \= (key) \=>

    setSelected({

      ...selected,

      \[key\]: !selected\[key\]

    });

  return (

    <ChipSet role\="grid"\>

      <Chip

        selected\={selected.cookies}

        checkmark

        onInteraction\={() \=> toggleSelected('cookies')}

        label\="Cookies"

      />

      <Chip

        selected\={selected.pizza}

        checkmark

        onInteraction\={() \=> toggleSelected('pizza')}

        icon\="local\_pizza"

        label\="Pizza"

      />

      <Chip

        selected\={selected.icecream}

        checkmark

        onInteraction\={() \=> toggleSelected('icecream')}

        icon\="favorite\_border"

        label\="Icecream"

      />

    </ChipSet\>

  );

}


```

Listbox

```js

function Example() {

  const \[selected, setSelected\] \= React.useState({

    cookies: false,

    pizza: false,

    icecream: false

  });

  const toggleSelected \= (key) \=>

    setSelected({

      ...selected,

      \[key\]: !selected\[key\]

    });

  return (

    <ChipSet role\="listbox"\>

      <Chip

        selected\={selected.cookies}

        onInteraction\={() \=> toggleSelected('cookies')}

        label\="Cookies"

      />

      <Chip

        selected\={selected.pizza}

        onInteraction\={() \=> toggleSelected('pizza')}

        icon\="local\_pizza"

        label\="Pizza"

      />

      <Chip

        selected\={selected.icecream}

        onInteraction\={() \=> toggleSelected('icecream')}

        icon\="favorite\_border"

        label\="Icecream"

      />

    </ChipSet\>

  );

}


```

## Chip

## ChipSet