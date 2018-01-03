# Snackbars

> Snackbars provide brief feedback about an operation through a message at the bottom of the screen.

import from **rmwc/Snackbar**  
[https://material.io/components/web/catalog/snackbars/](https://material.io/components/web/catalog/snackbars/)

```jsx render
import { Snackbar } from 'rmwc/Snackbar';
import { Button } from 'rmwc/Button';

{/* A standard snackbar */}
<Snackbar
  show={this.state.snackbarIsOpen}
  onClose={evt => this.setState({snackbarIsOpen: false})}
  message="This is a new message"
  actionText="Action"
  actionHandler={() => alert('Action clicked')}
/>

<Button
  raised
  onClick={evt => this.setState({snackbarIsOpen: !this.state.snackbarIsOpen})}
>
  Show snackbar
</Button>

{/* A snackbar that is start aligned on larger devices. */}
<Snackbar
  show={this.state.snackbarStartIsOpen}
  onClose={evt => this.setState({snackbarStartIsOpen: false})}
  message="Start aligned"
  actionText="Dismiss"
  actionHandler={() => {}}
  alignStart
/>

<Button
  onClick={evt => this.setState({snackbarStartIsOpen: !this.state.snackbarStartIsOpen})}
>
  Show start-aligned
</Button>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/DocumentComponent';

<DocumentComponent displayName="Snackbar" />
```
