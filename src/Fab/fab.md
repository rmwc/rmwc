# Fabs

- import from **rmwc/Fab**  
- import styles from **@material/fab/dist/mdc.fab.css**
- [https://material.io/develop/web/components/buttons/floating-action-buttons/](https://material.io/develop/web/components/buttons/floating-action-buttons/)

```jsx render
import { Fab } from 'rmwc/Fab';

<Fab icon="favorite" />
<Fab icon="favorite" mini />
<Fab icon="favorite" label="Love It!" />
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="Fab" composes={['Icon']} />
```
