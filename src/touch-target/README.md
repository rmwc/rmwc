# Touch Target

Touch targets are the parts of the screen that respond to user input. They extend beyond the visual bounds of an element. For example, an icon may appear to be 24 x 24 dp, but the padding surrounding it comprises the full 48 x 48 dp touch target.

- Module **@rmwc/touch-target-wrapper**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/touch-target-wrapper/styles';
  - Or include stylesheets
    - **'@material/button/dist/mdc.button.css'**
- MDC Docs: [https://material.io/design/usability/accessibility.html#understanding-accessibility](https://material.io/design/usability/accessibility.html#understanding-accessibility)

```jsx
<TouchTargetWrapper>
  <Button label="Button" />
</TouchTargetWrapper>
```

## TouchTargetWrapper
The ButTouchTargetWrapperon component.

### Props

| Name | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode` | Content specified as children. |


