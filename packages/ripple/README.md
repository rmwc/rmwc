Ripples
=======

> MDC Ripple provides the JavaScript and CSS required to provide components (or any element at all) with a material “ink ripple” interaction effect. It is designed to be efficient, uninvasive, and usable without adding any extra DOM to your elements.

*   Module **@rmwc/ripple**
*   Import styles:
    *   Using CSS Loader
        *   import **'@rmwc/ripple/styles';**
    *   Or include stylesheets
        *   **'@material/ripple/dist/mdc.ripple.css'**;
*   MDC Docs: [https://material.io/develop/web/components/ripples/](https://material.io/develop/web/components/ripples/)

Ripples will wrap whatever child component you pass it and apply the appropriate classes and styles.

```js

<Ripple\>

  <p\>Standard Ripple</p\>

</Ripple\>


```

```js

<Ripple primary\>

  <p\>Primary</p\>

</Ripple\>


```

```js

<Ripple accent\>

  <p\>Accent</p\>

</Ripple\>


```

```js

<Ripple unbounded\>

  <p\>Unbounded</p\>

</Ripple\>


```

Ripple
------