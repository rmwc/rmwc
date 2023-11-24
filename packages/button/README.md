# Buttons

> Buttons communicate the action that will occur when the user touches them.

- Module **@rmwc/button**
- Import styles:
  - Using CSS Loader
    - import **'@rmwc/button/styles';**
  - Or include stylesheets
    - **'@material/button/dist/mdc.button.css'**;
    - **'@rmwc/@rmwc/icon/icon.css'**;
    - **'@material/ripple/dist/mdc.ripple.css'**;
- MDC Docs: [https://material.io/develop/web/components/buttons/](https://material.io/develop/web/components/buttons/)

Default

```js

<Button label\="Button" />


```

Icons

```js

<\>

  <Button label\="Icon" icon\="favorite" />

  <Button label\="Trailing" trailingIcon\="keyboard\_arrow\_right" />

  <Button label\="Loading" icon\={<CircularProgress />} />

</\>


```

Variants

```js

<\>

  <Button label\="Raised" raised />

  <Button label\="Unelevated" unelevated />

  <Button label\="Outlined" outlined />

  <Button label\="Dense" dense />

  <Button label\="No Ripple" ripple\={false} />

</\>


```

Danger

```js

<\>

  <Button label\="Danger" danger raised />

  <Button label\="Danger" danger outlined />

  <Button label\="Danger" danger />

</\>


```

Theming

```js

<\>

  <Button

    label\="With Theme"

    raised

    theme\={\['secondaryBg', 'onSecondary'\]}

  />

  {/\*\*

    This example uses "accent" to control the color of the Ripple.

    See the documentation on Ripples.

  \*/}

  <Button label\="With Theme" theme\="secondary" />

</\>


```

Children

```js

<Button\>

  {/\*\* Alternatively pass content as children \*/}

  As Children

</Button\>


```

Touch Target Wrapper

```js

<\>

  {/\*\* Wrapping a button in TouchTargetWrapper will automatically set its \`touch\` prop to true. \*/}

  <TouchTargetWrapper\>

    <Button\>Touch Accessible</Button\>

  </TouchTargetWrapper\>

</\>


```

## Button
