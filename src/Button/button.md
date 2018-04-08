# Buttons

> Buttons communicate the action that will occur when the user touches them.

import from **rmwc/Button**  
[https://material.io/components/web/catalog/buttons/](https://material.io/components/web/catalog/buttons/)

```jsx render
import { Button, ButtonIcon } from 'rmwc/Button';

<Button>Default</Button>
<Button><ButtonIcon use="favorite" /> With Icon</Button>
<Button raised>Raised</Button>
<Button dense>Dense</Button>
<Button unelevated>Unelevated</Button>
<Button stroked>Stroked</Button>
<Button raised theme="secondary-bg text-primary-on-secondary">With Theme</Button>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="Button" />
<DocumentComponent displayName="ButtonIcon" />
```
