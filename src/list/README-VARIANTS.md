# List Variants

> Lists are continuous, vertical indexes of text or images.

- import from **'@rmwc/list'**;
- Import styles:
  - import **'@material/list/dist/mdc.list.css'**;
- MDC Docs: [https://material.io/develop/web/components/lists/](https://material.io/develop/web/components/lists/)

## Two Line
When using the `twoLine` prop, you have to wrap the contents of the `ListItem` in `ListItemText`.

```jsx render
import {
  List,
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText
} from '@rmwc/list';

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
```

## Leading and Trailing Icons
```jsx render
import {
  List,
  ListItem,
  ListItemGraphic,
  ListItemMeta
} from '@rmwc/list';

<List>
  <ListItem>
    <ListItemGraphic icon="favorite"/>
    Leading
  </ListItem>
  <ListItem>
    Trailing
    <ListItemMeta icon="star"/>
  </ListItem>
  <ListItem>
    <ListItemGraphic icon="wifi"/>
    Leading and Trailing
    <ListItemMeta icon="info"/>
  </ListItem>
  <ListItem>
    <ListItemGraphic icon="wifi"/>
    Leading with Trailing Text
    <ListItemMeta>HELLO!</ListItemMeta>
  </ListItem>
</List>
```

## Avatar List with Dividers
```jsx render
import {
  List,
  ListGroup,
  ListDivider,
  ListItem,
  ListItemGraphic,
  ListItemMeta,
} from '@rmwc/list';

import { Avatar } from '@rmwc/avatar';



<List twoLine avatarList>
  <ListGroup>
    <ListItem>
      <ListItemGraphic icon={
        <Avatar
          src="images/avatars/blackwidow.png"
          size="xsmall"
          name="Natalia Alianovna Romanova"
        />
      }/>
      Natalia Alianovna Romanova
      <ListItemMeta icon="info"/>
    </ListItem>
    <ListItem>
      <ListItemGraphic icon={
        <Avatar
          src="images/avatars/hulk.png"
          size="small"
          name="Bruce Banner"
        />
      }/>
      Bruce Banner
      <ListItemMeta icon="info"/>
    </ListItem>
  </ListGroup>
  <ListDivider />
  <ListGroup>
    <ListItem>
      <ListItemGraphic icon={
        <Avatar
          src="images/avatars/thor.png"
          size="medium"
          name="Thor Odinson"
        />
      }/>
      Thor Odinson
      <ListItemMeta icon="info"/>
    </ListItem>
  </ListGroup>
</List>
```


## Selectable

Checkboxes and Radios can be included as part of `ListItemMeta`. It is recommended when using these that you are using controlled components, and that you put your interaction handler on the `ListItem` itself. Notice the `readOnly` prop is also set on the individual form elements.

```jsx render
import {
  List,
  ListItem,
  ListItemMeta,
  ListDivider
} from '@rmwc/list';

import { Checkbox } from '@rmwc/checkbox';
import { Switch } from '@rmwc/switch';
import { Radio } from '@rmwc/radio';

<List>
  <ListItem onClick={() => this.setState({oneCheck: !this.state.oneCheck})}>
    Cookies
    <ListItemMeta>
      <Checkbox checked={!!this.state.oneCheck} readOnly/>
    </ListItemMeta>
  </ListItem>
  <ListItem onClick={() => this.setState({twoCheck: !this.state.twoCheck})}>
    Pizza
    <ListItemMeta>
      <Checkbox checked={!!this.state.twoCheck} readOnly/>
    </ListItemMeta>
  </ListItem>
  <ListItem onClick={() => this.setState({threeCheck: !this.state.threeCheck})}>
    Icecream
    <ListItemMeta>
      <Checkbox checked={!!this.state.threeCheck} readOnly/>
    </ListItemMeta>
  </ListItem>
</List>

<List>
  <ListItem onClick={() => this.setState({oneSwitch: !this.state.oneSwitch})}>
    Cookies
    <ListItemMeta>
      <Switch checked={!!this.state.oneSwitch} readOnly/>
    </ListItemMeta>
  </ListItem>
  <ListItem onClick={() => this.setState({twoSwitch: !this.state.twoSwitch})}>
    Pizza
    <ListItemMeta>
      <Switch checked={!!this.state.twoSwitch} readOnly/>
    </ListItemMeta>
  </ListItem>
  <ListItem onClick={() => this.setState({threeSwitch: !this.state.threeSwitch})}>
    Icecream
    <ListItemMeta>
      <Switch checked={!!this.state.threeSwitch} readOnly/>
    </ListItemMeta>
  </ListItem>
</List>


<List>
  <ListItem onClick={() => this.setState({radioVal: 'cookies'})}>
    Cookies
    <ListItemMeta>
      <Radio checked={this.state.radioVal === 'cookies'} readOnly/>
    </ListItemMeta>
  </ListItem>
  <ListItem onClick={() => this.setState({radioVal: 'pizza'})}>
    Pizza
    <ListItemMeta>
      <Radio checked={this.state.radioVal === 'pizza'} readOnly/>
    </ListItemMeta>
  </ListItem>
  <ListItem onClick={() => this.setState({radioVal: 'icecream'})}>
    Icecream
    <ListItemMeta>
      <Radio checked={this.state.radioVal === 'icecream'} readOnly/>
    </ListItemMeta>
  </ListItem>
</List>
```