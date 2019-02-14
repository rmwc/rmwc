# Lists

> Lists are continuous, vertical indexes of text or images.

- import from **'@rmwc/list'**;
- Import styles:
  - import **'@material/list/dist/mdc.list.css'**;
- MDC Docs: [https://material.io/develop/web/components/lists/](https://material.io/develop/web/components/lists/)

ListItems can be verbose to import and render. A 'SimpleListItem' component has been created to improve the developer experience which contains a default template for ListItems. This page shows some basic usage, be sure to check out the [variants page](/lists-variants) to see all of the ways you can customize your lists.

## Standard Usage

```jsx render
import {
  List,
  ListItem
} from '@rmwc/list';

<List>
  <ListItem>Cookies</ListItem>
  <ListItem>Pizza</ListItem>
  <ListItem>Icecream</ListItem>
</List>
```

## Simplified Usage

```jsx render
import {
  List,
  SimpleListItem
} from '@rmwc/list';

<List twoLine>
  <SimpleListItem graphic="star_border" text="Cookies" secondaryText="Chocolate chip" metaIcon="info" />
  <SimpleListItem graphic="local_pizza" text="Pizza" secondaryText="Pepperoni" metaIcon="info" />
  <SimpleListItem activated graphic="mood" text="Icecream" secondaryText="Chocolate cookie dough" meta="Winner!" />
</List>
```

```jsx renderOnly
import { Docs } from '@rmwc/base/utils/document-component';
import * as docs from './docgen.json';

<Docs src={docs} components={[
  'List',
  'ListItem',
  'ListItemPrimaryText',
  'ListItemSecondaryText',
  'ListItemGraphic',
  'ListItemMeta',
  'ListDivider',
  'ListGroup',
  'ListGroupSubheader',
  'SimpleListItem'
]} />
```
