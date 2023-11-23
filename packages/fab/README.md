# Fabs

> A floating action button (FAB) represents the primary action of a screen.

-   Module __@rmwc/fab__
-   Import styles:
    -   Using CSS Loader
        -   import __'@rmwc/fab/styles';__
    -   Or include stylesheets
        -   __'@material/fab/dist/mdc.fab.css'__;
        -   __'@rmwc/icon/icon.css'__;
        -   __'@material/ripple/dist/mdc.ripple.css'__;
-   MDC Docs: [https://material.io/develop/web/components/buttons/floating-action-buttons/](https://material.io/develop/web/components/buttons/floating-action-buttons/)

Default

```js

<Fab icon\="favorite" />


```

Mini

```js

<Fab icon\="favorite" mini />


```

Extended

```js

<\>

  <Fab icon\="add" label\="Create" />

  <Fab trailingIcon\="add" label\="Create" />

  <Fab label\="Label only" />

</\>


```

Theming

```js

<\>

  <Fab icon\="favorite\_outline" theme\={\['primaryBg', 'onPrimary'\]} />

  <Fab

    icon\="delete"

    style\={{ backgroundColor: 'var(--mdc-theme-error)' }}

    theme\={\['onError'\]}

  />

</\>


```

## Fab