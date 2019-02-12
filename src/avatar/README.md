# Avatars `RMWC Addon`

> Avatars are virtual representations of users in a system.

- Module **@rmwc/avatar**
- Import styles:
  - import **'@rmwc/avatar/avatar.css'**;

```jsx render
import { Avatar } from '@rmwc/avatar';

<Avatar
  src="images/avatars/blackwidow.png"
  size="xsmall"
  name="Natalia Alianovna Romanova"
/>
<Avatar
  src="images/avatars/hulk.png"
  size="small"
  name="Bruce Banner"
/>
<Avatar
  src="images/avatars/thor.png"
  size="medium"
  name="Thor Odinson"
/>
<Avatar
  src="images/avatars/captainamerica.png"
  size="large"
  name="Steve Rogers"
/>
<Avatar
  src="images/avatars/ironman.png"
  size="xlarge"
  name="Tony Stark"
/>

<Avatar name="Natalia Alianovna Romanova" size="xsmall" />
<Avatar name="Bruce Banner" size="small" />
<Avatar name="Thor Odinson" size="medium" />
<Avatar name="Steve Rogers" size="large" />
<Avatar name="Tony Stark" size="xlarge" />

{/** Square Variant */}
<Avatar
  src="images/avatars/blackwidow.png"
  size="large"
  name="Natalia Alianovna Romanova"
  square
/>

```

## Avatar Groups

This is for Avatars that are displayed in a corellated grouping or list.

```jsx render
import { Avatar, AvatarCount, AvatarGroup } from '@rmwc/avatar';

<AvatarGroup>
  <Avatar
    src="images/avatars/captainamerica.png"
    name="Steve Rogers"
    size="large"
    interactive
  />
  <Avatar
    src="images/avatars/ironman.png"
    name="Tony Stark"
    size="large"
    interactive
  />
  <AvatarCount
    size="large"
    value={12}
    interactive
  />
</AvatarGroup>

<AvatarGroup dense>
  <Avatar
    src="images/avatars/captainamerica.png"
    name="Steve Rogers"
    size="large"
    interactive
  />
  <Avatar
    src="images/avatars/ironman.png"
    name="Tony Stark"
    size="large"
    interactive
  />
  <AvatarCount
    size="large"
    overflow
    value={4}
    interactive
  />
</AvatarGroup>
```

## Usage in other components

The avatar component has been designed to work nicely in any of the places you would use an icon.

```jsx render
import { Avatar } from '@rmwc/avatar';

import { Button } from '@rmwc/button';
import { Chip } from '@rmwc/chip';
import { TextField } from '@rmwc/textfield';

<Button 
  label="Enlist now!"
  icon={
    <Avatar
      src="images/avatars/captainamerica.png"
      name="Steve Rogers"
    />
  }
/>

<Chip
  label="Hulk Smash"
  icon={
    <Avatar
      src="images/avatars/hulk.png"
      name="Bruce Banner"
    />
  }
/>

<TextField
  label="Message Natalia..."
  outlined
  icon={
    <Avatar
      src="images/avatars/blackwidow.png"
      name="Natalia Alianovna Romanova"
      square
    />
  }
/>

```

```jsx renderOnly
import { Docs } from '@rmwc/base/utils/document-component';
import * as docs from './docgen.json';

<Docs src={docs} components={['Avatar', 'AvatarGroup', 'AvatarCount']} />
```
