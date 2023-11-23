Lists
=====

> Lists are continuous, vertical indexes of text or images.

*   Module **@rmwc/list**
*   Import styles:
    *   Using CSS Loader
        *   import **'@rmwc/list/styles';**
    *   Or include stylesheets
        *   **'@material/list/dist/mdc.list.css'**;
        *   **'@material/ripple/dist/mdc.ripple.css'**;
        *   **'@rmwc/icon/icon.css'**;
*   MDC Docs: [https://material.io/develop/web/components/lists/](https://material.io/develop/web/components/lists/)

Basic Usage
-----------

Default

```js

<List\>

  <ListItem\>Cookies</ListItem\>

  <ListItem\>Pizza</ListItem\>

  <ListItem\>Icecream</ListItem\>

</List\>


```

Fully Featured

```js

<List twoLine\>

  <ListItem\>

    <ListItemGraphic icon\="star\_border" />

    <ListItemText\>

      <ListItemPrimaryText\>Cookies</ListItemPrimaryText\>

      <ListItemSecondaryText\>$4.99 a dozen</ListItemSecondaryText\>

    </ListItemText\>

    <ListItemMeta icon\="info" />

  </ListItem\>

  <ListItem\>

    <ListItemGraphic icon\="local\_pizza" />

    <ListItemText\>

      <ListItemPrimaryText\>Pizza</ListItemPrimaryText\>

      <ListItemSecondaryText\>$1.99 a slice</ListItemSecondaryText\>

    </ListItemText\>

    <ListItemMeta icon\="info" />

  </ListItem\>

  <ListItem activated\>

    <ListItemGraphic icon\="mood" />

    <ListItemText\>

      <ListItemPrimaryText\>Icecream</ListItemPrimaryText\>

      <ListItemSecondaryText\>$0.99 a scoop</ListItemSecondaryText\>

    </ListItemText\>

    <ListItemMeta\>Winner!</ListItemMeta\>

  </ListItem\>

</List\>


```

Simplified Usage
----------------

While there are siutations where you would need / want to compose the entire list yourself, it can be quite verbose. `SimpleListItem` provides a compact syntax that allows you to pass all options as props. The following example is roughly equivalent to the one above.

Simple

```js

<List twoLine\>

  <SimpleListItem

    graphic\="star\_border"

    text\="Cookies"

    secondaryText\="Chocolate chip"

    metaIcon\="info"

  />

  <SimpleListItem

    graphic\="local\_pizza"

    text\="Pizza"

    secondaryText\="Pepperoni"

    metaIcon\="info"

  />

  <SimpleListItem

    activated

    graphic\="mood"

    text\="Icecream"

    secondaryText\="Chocolate cookie dough"

    meta\="Winner!"

  />

</List\>


```

List
----

ListItem
--------

ListItemPrimaryText
-------------------

ListItemSecondaryText
---------------------

ListItemGraphic
---------------

ListItemMeta
------------

ListDivider
-----------

ListGroup
---------

ListGroupSubheader
------------------

SimpleListItem
--------------e\="Thor Odinson"

          />

        }

      />

      Thor Odinson

      <ListItemMeta icon\="info" />

    </ListItem\>

  </ListGroup\>

</List\>


```

Selectable
----------

Checkboxes and Radios can be included as part of `ListItemMeta`. It is recommended when using these that you are using controlled components, and that you put your interaction handler on the `ListItem` itself. Notice the `readOnly` prop is also set on the individual form elements.

Checkboxes

```js

function Example() {

  const \[checked, setChecked\] \= React.useState({

    Cookies: false,

    Pizza: false,

    Icecream: false

  });

  return (

    <List\>

      {\['Cookies', 'Pizza', 'Icecream'\].map((key) \=> (

        <ListItem

          key\={key}

          onClick\={() \=>

            setChecked({ ...checked, \[key\]: !checked\[key\] })

          }

        \>

          {key}

          <ListItemMeta\>

            <Checkbox checked\={checked\[key\]} readOnly />

          </ListItemMeta\>

        </ListItem\>

      ))}

    </List\>

  );

}


```

Switches

```js

function Example() {

  const \[checked, setChecked\] \= React.useState({

    Cookies: false,

    Pizza: false,

    Icecream: false

  });

  return (

    <List\>

      {\['Cookies', 'Pizza', 'Icecream'\].map((key) \=> (

        <ListItem

          key\={key}

          onClick\={() \=>

            setChecked({ ...checked, \[key\]: !checked\[key\] })

          }

        \>

          {key}

          <ListItemMeta\>

            <Switch checked\={checked\[key\]} readOnly />

          </ListItemMeta\>

        </ListItem\>

      ))}

    </List\>

  );

}


```

Radios

```js

function Example() {

  const \[checked, setChecked\] \= React.useState('Cookies');

  return (

    <List\>

      {\['Cookies', 'Pizza', 'Icecream'\].map((key) \=> (

        <ListItem key\={key} onClick\={() \=> setChecked(key)}\>

          {key}

          <ListItemMeta\>

            <Radio checked\={checked \=== key} readOnly />

          </ListItemMeta\>

        </ListItem\>

      ))}

    </List\>

  );

}


```

List
----

ListItem
--------

ListItemPrimaryText
-------------------

ListItemSecondaryText
---------------------

ListItemGraphic
---------------

ListItemMeta
------------

ListDivider
-----------

ListGroup
---------

ListGroupSubheader
------------------

SimpleListItem
--------------