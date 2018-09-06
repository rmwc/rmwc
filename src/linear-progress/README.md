# Linear Progress

> Progress and activity indicators are visual indications of an app loading content.

- import from **'@rmwc/linear-progress'**;
- import styles:
  - import **'@material/linear-progress/dist/mdc.linear-progress.css'**;
- MDC Docs: [https://material.io/develop/web/components/linear-progress/](https://material.io/develop/web/components/linear-progress/)

```jsx render
import { LinearProgress } from '@rmwc/linear-progress';

<LinearProgress progress={0.5}></LinearProgress>
<LinearProgress progress={0.6} buffer={0.8}></LinearProgress>
<LinearProgress determinate={false}></LinearProgress>
<LinearProgress progress={0.2} reversed></LinearProgress>
```

```jsx renderOnly
import { DocumentComponent } from '@rmwc/base/utils/DocumentComponent';
import * as docs from './docgen.json';

<DocumentComponent docs={docs} displayName="LinearProgress" />
```
