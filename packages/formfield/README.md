Form Fields
===========

> MDC Form Field provides an mdc-formfield helper class for easily making theme-aware, RTL-aware form field + label combos. It also provides an MDCFormField class for easily making input ripples respond to label events.

*   Module **@rmwc/formfield**
*   Import styles:
    *   Using CSS Loader
        *   import **'@rmwc/formfield/styles';**
    *   Or include stylesheets
        *   **'@material/form-field/dist/mdc.form-field.css'**;
*   MDC Docs: [https://material.io/develop/web/components/input-controls/form-fields/](https://material.io/develop/web/components/input-controls/form-fields/)

```js

<FormField\>

  <input type\="checkbox" id\="input" />

  <label htmlFor\="input"\>Input Label</label\>

</FormField\>


```

Align end
---------

```js

<FormField alignEnd\>

  <input type\="checkbox" id\="input" />

  <label htmlFor\="input"\>Input Label</label\>

</FormField\>


```

No wrap
-------

```js

<FormField noWrap\>

  <input type\="checkbox" id\="input" />

  <label htmlFor\="input"\>Input Label</label\>

</FormField\>


```

Space between
-------------

```js

<FormField spaceBetween\>

  <input type\="checkbox" id\="input" />

  <label htmlFor\="input"\>Input Label</label\>

</FormField\>


```

FormField
---------