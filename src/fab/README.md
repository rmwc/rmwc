# Fabs

- Module **@rmwc/fab**
- Import styles:
  - import **'@material/fab/dist/mdc.fab.css'**;
- MDC Docs:[https://material.io/develop/web/components/buttons/floating-action-buttons/](https://material.io/develop/web/components/buttons/floating-action-buttons/)

```jsx render
import { Fab } from '@rmwc/fab';

<Fab icon="favorite" />
<Fab icon="favorite" mini />
<Fab icon="add" label="Create" />
<Fab trailingIcon="add" label="Create" />
<Fab label="Label only" />
```

```jsx renderOnly
import { DocumentComponent } from '@rmwc/base/utils/document-component';
import * as docs from './docgen.json';
import * as iconDocs from '@rmwc/icon//docgen.json';


<DocumentComponent docs={[docs, iconDocs]} displayName="Fab" composes={['Icon']} />
```
