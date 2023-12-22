# Buttons

Buttons communicate the action that will occur when the user touches them.

- Module **@rmwc/button**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/button/styles';
  - Or include stylesheets
    - **'@material/button/dist/mdc.button.css'**
    - **'@rmwc/@rmwc/icon/icon.css'**
    - **'@material/ripple/dist/mdc.ripple.css'**
- MDC Docs: [https://material.io/develop/web/components/buttons/](https://material.io/develop/web/components/buttons/)

```jsx
<Button label="Button" />
```

```jsx
<>
  <Button label="Icon" icon="favorite" />
  <Button label="Trailing" trailingIcon="keyboard_arrow_right" />
  <Button label="Loading" icon={<CircularProgress />} />
</>
```

```jsx
<>
  <Button label="Raised" raised />
  <Button label="Unelevated" unelevated />
  <Button label="Outlined" outlined />
  <Button label="Dense" dense />
  <Button label="No Ripple" ripple={false} />
</>
```

```jsx
<>
  <Button label="Danger" danger raised />
  <Button label="Danger" danger outlined />
  <Button label="Danger" danger />
</>
```

```jsx
<>
  <Button label="With Theme" raised theme={['secondaryBg', 'onSecondary']} />
  {/**
    This example uses "accent" to control the color of the Ripple.
    See the documentation on Ripples.
  */}
  <Button label="With Theme" theme="secondary" />
</>
```

```jsx
<Button>
  {/** Alternatively pass content as children */}
  As Children
</Button>
```

```jsx
<>
  {/** Wrapping a button in TouchTargetWrapper will automatically set its `touch` prop to true. */}
  <TouchTargetWrapper>
    <Button>Touch Accessible</Button>
  </TouchTargetWrapper>
</>
```

## Button

The Button component.

### Props

| Name           | Type          | Description                                                                                                     |
| -------------- | ------------- | --------------------------------------------------------------------------------------------------------------- |
| `children`     | `ReactNode`   | Content specified as children.                                                                                  |
| `danger`       | `boolean`     | Used to indicate a dangerous action.                                                                            |
| `dense`        | `boolean`     | Make the Button dense.                                                                                          |
| `disabled`     | `boolean`     | Make the button disabled                                                                                        |
| `icon`         | `IconPropT`   | An Icon for the Button                                                                                          |
| `label`        | `any`         | Content specified as a label prop.                                                                              |
| `outlined`     | `boolean`     | Make the button outlined.                                                                                       |
| `raised`       | `boolean`     | Make the Button raised.                                                                                         |
| `ripple`       | `RipplePropT` | Adds a ripple effect to the component                                                                           |
| `touch`        | `boolean`     | Makes the button more touch friendly. This will automatically be set true if used inside of TouchTargetWrapper. |
| `trailingIcon` | `IconPropT`   | A trailing icon for the Button                                                                                  |
| `unelevated`   | `boolean`     | Make the button unelevated.                                                                                     |
