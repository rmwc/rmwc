import React from 'react';

import {
  DocProps,
  Docs,
  DocsExample,
  DocsP,
  DocsSubtitle
} from '@rmwc/doc-utils';
import examples from '../generated-examples/list-variants.json';
import propsSrc from '../generated-props/list.json';

import {
  List,
  ListDivider,
  ListGroup,
  ListGroupSubheader,
  ListItem,
  ListItemGraphic,
  ListItemMeta,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemText,
  SimpleListItem
} from '@rmwc/list';

import { Avatar } from '@rmwc/avatar';
import { Checkbox } from '@rmwc/checkbox';
import { Radio } from '@rmwc/radio';
import { Switch } from '@rmwc/switch';

export default function Readme() {
  return (
    <Docs
      title="Lists"
      lead="Lists are continuous, vertical indexes of text or images."
      module="@rmwc/list"
      styles={[
        '@material/list/dist/mdc.list.css',
        '@rmwc/icon/icon.css',
        '@material/ripple/dist/mdc.ripple.css',
        '@rmwc/ripple/ripple.css',
        '@rmwc/list/collapsible-list.css',
        '@rmwc/list/list-item.css'
      ]}
      docsLink="https://material.io/develop/web/components/lists/"
      examples={examples}
    >
      <DocsSubtitle>Two Line</DocsSubtitle>
      <DocsP>
        When using the `twoLine` prop, you have to wrap the contents of the
        `ListItem` in `ListItemText`.
      </DocsP>

      <DocsExample>
        <List twoLine>
          <ListItem>
            <ListItemText>
              <ListItemPrimaryText>Cookies</ListItemPrimaryText>
              <ListItemSecondaryText>$4.99 a dozen</ListItemSecondaryText>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <ListItemPrimaryText>Pizza</ListItemPrimaryText>
              <ListItemSecondaryText>$1.99 a slice</ListItemSecondaryText>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <ListItemPrimaryText>Icecream</ListItemPrimaryText>
              <ListItemSecondaryText>$0.99 a scoop</ListItemSecondaryText>
            </ListItemText>
          </ListItem>
        </List>
      </DocsExample>

      <DocsSubtitle>Leading and Trailing Icons</DocsSubtitle>

      <DocsExample>
        <List>
          <ListItem>
            <ListItemGraphic icon="favorite" />
            Leading
          </ListItem>
          <ListItem>
            Trailing
            <ListItemMeta icon="star" />
          </ListItem>
          <ListItem>
            <ListItemGraphic icon="wifi" />
            Leading and Trailing
            <ListItemMeta icon="info" />
          </ListItem>
          <ListItem>
            <ListItemGraphic icon="wifi" />
            Leading with Trailing Text
            <ListItemMeta>HELLO!</ListItemMeta>
          </ListItem>
        </List>
      </DocsExample>

      <DocsSubtitle>Avatar List with Dividers</DocsSubtitle>

      <DocsExample>
        <List twoLine avatarList>
          <ListGroup>
            <ListItem>
              <ListItemGraphic
                icon={
                  <Avatar
                    src="images/avatars/blackwidow.png"
                    size="xsmall"
                    name="Natalia Alianovna Romanova"
                  />
                }
              />
              Natalia Alianovna Romanova
              <ListItemMeta icon="info" />
            </ListItem>
            <ListItem>
              <ListItemGraphic
                icon={
                  <Avatar
                    src="images/avatars/hulk.png"
                    size="small"
                    name="Bruce Banner"
                  />
                }
              />
              Bruce Banner
              <ListItemMeta icon="info" />
            </ListItem>
          </ListGroup>
          <ListDivider />
          <ListGroup>
            <ListItem>
              <ListItemGraphic
                icon={
                  <Avatar
                    src="images/avatars/thor.png"
                    size="medium"
                    name="Thor Odinson"
                  />
                }
              />
              Thor Odinson
              <ListItemMeta icon="info" />
            </ListItem>
          </ListGroup>
        </List>
      </DocsExample>

      <DocsSubtitle>Selectable</DocsSubtitle>
      <DocsP>
        Checkboxes and Radios can be included as part of `ListItemMeta`. It is
        recommended when using these that you are using controlled components,
        and that you put your interaction handler on the `ListItem` itself.
        Notice the `readOnly` prop is also set on the individual form elements.
      </DocsP>

      <DocsExample label="singleSelection">
        {function Example() {
          const [selectedIndex, setSelectedIndex] = React.useState(-1);

          return (
            <List
              selectedIndex={selectedIndex}
              onAction={(evt) => setSelectedIndex(evt.detail.index)}
            >
              <ListItem>Cookies</ListItem>
              <ListItem>Pizza</ListItem>
              <ListItem>Cake</ListItem>
            </List>
          );
        }}
      </DocsExample>

      <DocsExample label="Checkboxes">
        {function Example() {
          const shoppingList = ['Cookies', 'Pizza', 'Icecream'];
          const [selectedIndex, setSelectedIndex] = React.useState<number[]>(
            []
          );

          //@ts-ignore
          const handleSelect = (evt) => {
            setSelectedIndex((indices) =>
              indices.includes(evt.detail.index)
                ? indices.filter((_) => _ !== evt.detail.index)
                : [...indices, evt.detail.index]
            );
          };

          return (
            <List
              aria-label="Shopping List"
              selectedIndex={selectedIndex}
              onAction={handleSelect}
            >
              {shoppingList.map((key) => (
                <ListItem key={key}>
                  {key}
                  <ListItemMeta>
                    <Checkbox readOnly label={key} />
                  </ListItemMeta>
                </ListItem>
              ))}
            </List>
          );
        }}
      </DocsExample>

      <DocsExample label="Switches">
        {function Example() {
          const [checked, setChecked] = React.useState(
            new Map<string, boolean>([
              ['Cookies', false],
              ['Pizza', false],
              ['Icecream', false]
            ])
          );

          return (
            <List>
              {['Cookies', 'Pizza', 'Icecream'].map((key) => (
                <ListItem
                  key={key}
                  onClick={() =>
                    setChecked((prev) => new Map(prev).set(key, !prev.get(key)))
                  }
                >
                  {key}&nbsp;
                  <ListItemMeta>
                    <Switch label={key} checked={checked.get(key)} />
                  </ListItemMeta>
                </ListItem>
              ))}
            </List>
          );
        }}
      </DocsExample>

      <DocsExample label="Radios">
        {function Example() {
          const mealchoices = ['Beef', 'Chicken', 'Vegetable Lasagna'];
          const [selectedIndex, setSelectedIndex] = React.useState(0);

          //@ts-ignore
          const handleSelect = (evt) => setSelectedIndex(evt.detail.index);

          return (
            <List
              aria-label="Please Pick a Meal"
              selectedIndex={selectedIndex}
              onAction={handleSelect}
            >
              {mealchoices.map((key) => (
                <ListItem key={key}>
                  {key}
                  <ListItemMeta>
                    <Radio readOnly name="meal-choices-group" label={key} />
                  </ListItemMeta>
                </ListItem>
              ))}
            </List>
          );
        }}
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          { displayName: 'List', component: List },
          { displayName: 'ListItem', component: ListItem },
          {
            displayName: 'ListItemPrimaryText',
            component: ListItemPrimaryText
          },
          {
            displayName: 'ListItemSecondaryText',
            component: ListItemSecondaryText
          },
          { displayName: 'ListItemGraphic', component: ListItemGraphic },
          { displayName: 'ListItemMeta', component: ListItemMeta },
          { displayName: 'ListDivider', component: ListDivider },
          { displayName: 'ListGroup', component: ListGroup },
          { displayName: 'ListGroupSubheader', component: ListGroupSubheader },
          { displayName: 'SimpleListItem', component: SimpleListItem }
        ]}
      />
    </Docs>
  );
}
