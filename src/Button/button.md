# Buttons

> Buttons communicate the action that will occur when the user touches them.

import from **rmwc/Button**  
[https://material.io/components/web/catalog/buttons/](https://material.io/components/web/catalog/buttons/)

```jsx render
import { Button } from 'rmwc/Button';

<Button>Default</Button>
<Button raised>Raised</Button>
<Button dense>Dense</Button>
<Button compact>Compact</Button>
<Button unelevated>Unelevated</Button>
<Button stroked>Stroked</Button>
<Button raised theme={['secondary-bg', 'text-primary-on-secondary']}>With Theme</Button>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/DocumentComponent';

<DocumentComponent displayName="Button" />
```
