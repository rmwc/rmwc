# Lists

> Lists are continuous, vertical indexes of text or images.

- Module **@rmwc/list**
- Import styles:
  - Using CSS Loader
    - import **'@rmwc/list/styles';**
  - Or include stylesheets
    - **'@material/list/dist/mdc.list.css'**;
- MDC Docs: [https://material.io/develop/web/components/lists/](https://material.io/develop/web/components/lists/)

## Two Line

When using the `twoLine` prop, you have to wrap the contents of the `ListItem` in `ListItemText`.

```js

<List twoLine\>

  <ListItem\>

    <ListItemText\>

      <ListItemPrimaryText\>Cookies</ListItemPrimaryText\>

      <ListItemSecondaryText\>$4.99 a dozen</ListItemSecondaryText\>

    </ListItemText\>

  </ListItem\>

  <ListItem\>

    <ListItemText\>

      <ListItemPrimaryText\>Pizza</ListItemPrimaryText\>

      <ListItemSecondaryText\>$1.99 a slice</ListItemSecondaryText\>

    </ListItemText\>

  </ListItem\>

  <ListItem\>

    <ListItemText\>

      <ListItemPrimaryText\>Icecream</ListItemPrimaryText\>

      <ListItemSecondaryText\>$0.99 a scoop</ListItemSecondaryText\>

    </ListItemText\>

  </ListItem\>

</List\>


```

## Leading and Trailing Icons

```js

<List\>

  <ListItem\>

    <ListItemGraphic icon\="favorite" />

    Leading

  </ListItem\>

  <ListItem\>

    Trailing

    <ListItemMeta icon\="star" />

  </ListItem\>

  <ListItem\>

    <ListItemGraphic icon\="wifi" />

    Leading and Trailing

    <ListItemMeta icon\="info" />

  </ListItem\>

  <ListItem\>

    <ListItemGraphic icon\="wifi" />

    Leading with Trailing Text

    <ListItemMeta\>HELLO!</ListItemMeta\>

  </ListItem\>

</List\>


```

## Avatar List with Dividers

```js

<List twoLine avatarList\>

  <ListGroup\>

    <ListItem\>

      <ListItemGraphic

        icon\={

          <Avatar

            src\="images/avatars/blackwidow.png"

            size\="xsmall"

            name\="Natalia Alianovna Romanova"

          />

        }

      />

      Natalia Alianovna Romanova

      <ListItemMeta icon\="info" />

    </ListItem\>

    <ListItem\>

      <ListItemGraphic

        icon\={

          <Avatar

            src\="images/avatars/hulk.png"

            size\="small"

            name\="Bruce Banner"

          />

        }

      />

      Bruce Banner

      <ListItemMeta icon\="info" />

    </ListItem\>

  </ListGroup\>

  <ListDivider />

  <ListGroup\>

    <ListItem\>

      <ListItemGraphic

        icon\={

          <Avatar

            src\="images/avatars/thor.png"

            size\="medium"

            name\="Thor Odinson"

          />

        }

      />

      Thor Odinson

      <ListItemMeta icon\="info" />

    </ListItem\>

  </ListGroup\>

</List\>


```

## Selectable

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

## List

## ListItem

## ListItemPrimaryText

## ListItemSecondaryText

## ListItemGraphic

## ListItemMeta

## ListDivider

## ListGroup

## ListGroupSubheader

## SimpleListItem
