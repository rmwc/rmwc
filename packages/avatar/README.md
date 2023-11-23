# Avatars`RMWC ADDON`

> Avatars are virtual representations of users in a system.

-   Module __@rmwc/avatar__
-   Import styles:
    -   Using CSS Loader
        -   import __'@rmwc/avatar/styles';__
    -   Or include stylesheets
        -   __'@rmwc/avatar/avatar.css'__;
        -   __'@rmwc/icon/icon.css'__;
        -   __'@material/ripple/dist/mdc.ripple.css'__;

Images

```js

<\>

  <Avatar

    src\="images/avatars/blackwidow.png"

    size\="xsmall"

    name\="Natalia Alianovna Romanova"

  />

  <Avatar

    src\="images/avatars/hulk.png"

    size\="small"

    name\="Bruce Banner"

  />

  <Avatar

    src\="images/avatars/thor.png"

    size\="medium"

    name\="Thor Odinson"

  />

  <Avatar

    src\="images/avatars/captainamerica.png"

    size\="large"

    name\="Steve Rogers"

  />

  <Avatar

    src\="images/avatars/ironman.png"

    size\="xlarge"

    name\="Tony Stark"

  />

</\>


```

Initials Only

```js

<\>

  <Avatar name\="Natalia Alianovna Romanova" size\="xsmall" />

  <Avatar name\="Bruce Banner" size\="small" />

  <Avatar name\="Thor Odinson" size\="medium" />

  <Avatar name\="Steve Rogers" size\="large" />

  <Avatar name\="Tony Stark" size\="xlarge" />

</\>


```

Square Variant

```js

<Avatar

  src\="images/avatars/blackwidow.png"

  size\="large"

  name\="Natalia Alianovna Romanova"

  square

/>


```

Contained

```js

<Avatar

  src\="images/avatars/google.svg"

  size\="large"

  contain

  name\="Google"

  square

/>


```

## Avatar Groups

This is for Avatars that are displayed in a corellated grouping or list.

Standard

```js

<AvatarGroup\>

  <Avatar

    src\="images/avatars/captainamerica.png"

    name\="Steve Rogers"

    size\="large"

    interactive

  />

  <Avatar

    src\="images/avatars/ironman.png"

    name\="Tony Stark"

    size\="large"

    interactive

  />

  <AvatarCount size\="large" value\={12} interactive />

</AvatarGroup\>


```

Dense

```js

<AvatarGroup dense\>

  <Avatar

    src\="images/avatars/captainamerica.png"

    name\="Steve Rogers"

    size\="large"

    interactive

  />

  <Avatar

    src\="images/avatars/ironman.png"

    name\="Tony Stark"

    size\="large"

    interactive

  />

  <AvatarCount size\="large" overflow value\={4} interactive />

</AvatarGroup\>


```

## Usage with other components

The avatar component has been designed to work nicely in any of the places you would use an icon.

```js

<Button

  label\="Enlist now!"

  icon\={

    <Avatar

      src\="images/avatars/captainamerica.png"

      name\="Steve Rogers"

    />

  }

/>


```

```js

<Chip

  label\="Hulk Smash"

  icon\={<Avatar src\="images/avatars/hulk.png" name\="Bruce Banner" />}

/>


```

```js

<TextField

  label\="Message Natalia..."

  outlined

  icon\={

    <Avatar

      src\="images/avatars/blackwidow.png"

      name\="Natalia Alianovna Romanova"

      square

    />

  }

/>


```

## Avatar

## AvatarGroup

## AvatarCount