# Segmented Button

Segmented buttons allow users to toggle the selected states of grouped buttons.

- Module **@rmwc/segmented-button**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/segmented-button/styles';
  - Or include stylesheets
    - **'@material/segmented-button/dist/mdc.segmented-button.css'**
    - **'@rmwc/@rmwc/icon/icon.css'**
    - **'@material/ripple/dist/mdc.ripple.css'**
- MDC Docs: [https://material.io/develop/web/components/segmented-button/](https://material.io/develop/web/components/segmented-button/)

```jsx
<SegmentedButton label="Button" />
```

## SegmentedButton
Segmented Button

### Props

| Name | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode` | Content specified as children. |
| `danger` | `undefined \| false \| true` | Used to indicate a dangerous action. |
| `dense` | `undefined \| false \| true` | Make the Button dense. |
| `disabled` | `undefined \| false \| true` | Make the button disabled |
| `icon` | `RMWC.IconPropT` | An Icon for the Button |
| `label` | `React.ReactNode \| any` | Content specified as a label prop. |
| `outlined` | `undefined \| false \| true` | Make the button outlined. |
| `raised` | `undefined \| false \| true` | Make the Button raised. |
| `touch` | `undefined \| false \| true` | Makes the button more touch friendly. This will automatically be set true if used inside of TouchTargetWrapper. |
| `trailingIcon` | `RMWC.IconPropT` | A trailing icon for the Button |
| `unelevated` | `undefined \| false \| true` | Make the button unelevated. |


