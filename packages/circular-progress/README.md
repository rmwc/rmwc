Circular Progress
=================

> Circular progress indicators display progress by animating an indicator along an invisible circular track in a clockwise direction. They can be applied directly to a surface, such as a button or card.

*   Module **@rmwc/circular-progress**
*   Import styles:
    *   Using CSS Loader
        *   import **'@rmwc/circular-progress/styles';**
    *   Or include stylesheets
        *   **'@rmwc/circular-progress/circular-progress.css'**;

Basic Usage
-----------

Indeterminate

```js

<CircularProgress />


```

Determinate

```js

<\>

  <CircularProgress progress\={0.3} />

  <CircularProgress progress\={0.6} />

  <CircularProgress progress\={0.9} />

  <CircularProgress progress\={1} />

</\>


```

Sizing
------

Sizes

```js

<\>

  <CircularProgress size\="xsmall" />

  <CircularProgress size\="small" />

  <CircularProgress size\="medium" />

  <CircularProgress size\="large" />

  <CircularProgress size\="xlarge" />

  <CircularProgress size\={72} />

</\>


```

Usage with other components
---------------------------

```js

<\>

  <Button

    icon\={<CircularProgress theme\="secondary" />}

    label\="Cookies"

  />

  <List\>

    <SimpleListItem graphic\={<CircularProgress />} text\="Pizza" />

    <SimpleListItem graphic\="favorite" text\="Icecream" />

  </List\>

  <Chip icon\={<CircularProgress size\="xsmall" />} label\="Donuts" />

</\>


```

CircularProgress
----------------