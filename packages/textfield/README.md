Text Fields
===========

> Text fields allow users to input, edit, and select text.

*   Module **@rmwc/textfield**
*   Import styles:
    *   Using CSS Loader
        *   import **'@rmwc/textfield/styles';**
    *   Or include stylesheets
        *   **'@material/textfield/dist/mdc.textfield.css'**;
        *   **'@material/floating-label/dist/mdc.floating-label.css'**;
        *   **'@material/notched-outline/dist/mdc.notched-outline.css'**;
        *   **'@material/line-ripple/dist/mdc.line-ripple.css'**;
        *   **'@material/ripple/dist/mdc.ripple.css'**;
        *   **'@rmwc/icon/icon.css'**;
*   MDC Docs: [https://material.io/develop/web/components/input-controls/text-field/](https://material.io/develop/web/components/input-controls/text-field/)

TextField Variants
------------------

Standard

```js

<TextField label\="standard..." />


```

Outlined

```js

<TextField outlined label\="outlined..." />


```

No Label

```js

<TextField placeholder\="No label" />


```

Icons

```js

<\>

  {/\* Leading and trailing icons can be used.\*/}

  <TextField icon\="search" trailingIcon\="close" label\="icon..." />

  {/\* If you need full control over the icon, you can pass the icon as options with your own props. Dont forget the TabIndex to make it clickable\*/}

  <TextField

    label\="trailingIcon..."

    trailingIcon\={{

      icon: 'close',

      tabIndex: 0,

      onClick: () \=> console.log('Clear')

    }}

  />

</\>


```

Fullwidth

```js

<TextField fullwidth label\="fullwidth..." />


```

Textareas
---------

You can make the TextField a textarea. Make sure to include `outlined` for proper styling You can optionally make help text always visible by passing an object as props with persistent set to true. Textareas can also have an optional character counter which will work with the maxLength property.

```js

<div\>

  <TextField

    textarea

    label\="textarea..."

    rows\={8}

    maxLength\={20}

    characterCount

    resizeable

    helpText\={{

      persistent: true,

      validationMsg: true,

      children: 'The field is required'

    }}

  />

</div\>


```

Validation
----------

Disabled

```js

<TextField disabled label\="Disabled..." />


```

Required

```js

<TextField required label\="Required..." value\="" />


```

Invalid

```js

<TextField

  invalid

  label\="Invalid..."

  value\="#@!$"

  onChange\={() \=> {}}

/>


```

Validation Pattern

```js

<TextField label\="Validate Pattern" pattern\="\[A-Za-z\]{3}" />


```

HTML Input Types
----------------

A preview of how `material-components-web` handles styling input types for your browser.

```js

<\>

  <TextField label\="text" type\="text" />

  <TextField label\="color" type\="color" style\={{ width: '6rem' }} />

  <TextField label\="date" type\="date" />

  <TextField label\="datetime-local" type\="datetime-local" />

  <TextField label\="month" type\="month" />

  <TextField label\="range" type\="range" />

  <TextField label\="time" type\="time" />

  <TextField label\="week" type\="week" />

</\>


```

TextField
---------