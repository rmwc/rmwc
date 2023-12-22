# Ripples

MDC Ripple provides the JavaScript and CSS required to provide components (or any element at all) with a material “ink ripple” interaction effect. It is designed to be efficient, uninvasive, and usable without adding any extra DOM to your elements.

- Module **@rmwc/ripple**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/ripple/styles';
  - Or include stylesheets
    - **'@material/ripple/dist/mdc.ripple.css'**
- MDC Docs: [https://material.io/develop/web/components/ripples/](https://material.io/develop/web/components/ripples/)

Ripples will wrap whatever child component you pass it and apply the appropriate classes and styles.

```jsx
<Ripple>
  <p>Standard Ripple</p>
</Ripple>
```

```jsx
<Ripple primary>
  <p>Primary</p>
</Ripple>
```

```jsx
<Ripple accent>
  <p>Accent</p>
</Ripple>
```

```jsx
<Ripple unbounded>
  <p>Unbounded</p>
</Ripple>
```

## Ripple

A component for adding Ripples to other components.

### Props

| Name            | Type                         | Description                                 |
| --------------- | ---------------------------- | ------------------------------------------- |
| `accent`        | `boolean`                    | Makes the ripple an accent color            |
| `disabled`      | `boolean`                    | makes the ripple disabled                   |
| `foundationRef` | `Ref<MDCRippleFoundation<>>` | Advanced: A reference to the MDCFoundation. |
| `primary`       | `boolean`                    | Makes the ripple primary                    |
| `surface`       | `boolean`                    | For internal use                            |
| `unbounded`     | `boolean`                    | Makes the ripple unbounded                  |
