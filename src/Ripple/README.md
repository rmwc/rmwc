# Ripples

> MDC Ripple provides the JavaScript and CSS required to provide components (or any element at all) with a material “ink ripple” interaction effect. It is designed to be efficient, uninvasive, and usable without adding any extra DOM to your elements.

- import from **rmwc/Ripple** 
- import styles from **@material/ripple/dist/mdc.ripple.css**
- [https://material.io/develop/web/components/ripples/](https://material.io/develop/web/components/ripples/)

```jsx render
import { Ripple } from 'rmwc/Ripple';

<Ripple>
  <p>Standard Ripple</p>
</Ripple>

<Ripple primary>
  <p>Primary</p>
</Ripple>

<Ripple accent>
  <p>Accent</p>
</Ripple>

<Ripple unbounded>
  <p>Unbounded</p>
</Ripple>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="Ripple" />
```
