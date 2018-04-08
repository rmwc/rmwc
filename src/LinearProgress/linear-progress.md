# Linear Progress

> Progress and activity indicators are visual indications of an app loading content.

import from **rmwc/LinearProgress**  
[https://material.io/components/web/catalog/linear-progress/](https://material.io/components/web/catalog/linear-progress/)

```jsx render
import { LinearProgress } from 'rmwc/LinearProgress';

<LinearProgress progress={0.5}></LinearProgress>
<LinearProgress progress={0.6} buffer={0.8}></LinearProgress>
<LinearProgress determinate={false}></LinearProgress>
<LinearProgress progress={0.2} reversed></LinearProgress>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="LinearProgress" />
```
