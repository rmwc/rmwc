# Fabs

- import * from **'@rmwc/fab'**;
- import styles:
  - import **'@material/fab/dist/mdc.fab.css'**;
- MDC Docs:[https://material.io/develop/web/components/buttons/floating-action-buttons/](https://material.io/develop/web/components/buttons/floating-action-buttons/)

```jsx render
import { Fab } from '@rmwc/fab';

<Fab icon="favorite" />
<Fab icon="favorite" mini />
<Fab icon="favorite" label="Love It!" />
```

```jsx renderOnly
import { DocumentComponent } from '@rmwc/base/utils/DocumentComponent';
import * as docs from './docgen.json';

<DocumentComponent docs={docs} displayName="Fab" composes={['Icon']} />
```
