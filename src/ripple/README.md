# Ripples

> MDC Ripple provides the JavaScript and CSS required to provide components (or any element at all) with a material “ink ripple” interaction effect. It is designed to be efficient, uninvasive, and usable without adding any extra DOM to your elements.

- import from **'@rmwc/ripple'**;
- import styles:
  - import **'@material/ripple/dist/mdc.ripple.css'**;
- MDC Docs: [https://material.io/develop/web/components/ripples/](https://material.io/develop/web/components/ripples/)

```jsx render
import { Ripple } from '@rmwc/ripple';

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
import { DocumentComponent } from '@rmwc/base/utils/DocumentComponent';
import * as docs from './docgen.json';

<DocumentComponent docs={docs} displayName="Ripple" />
```
