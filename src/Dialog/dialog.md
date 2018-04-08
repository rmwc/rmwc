# Dialogs

> Dialogs inform users about a specific task and may contain critical information, require decisions, or involve multiple tasks.

Material Dialogs are a complex component. RMWC contains an additional non-standard `SimpleDialog` component for ease of use that internally contains the default structure already built out. Illustrated below is both the strandard and simple dialog usage.

import from **rmwc/Dialog**  
[https://material.io/components/web/catalog/dialogs/](https://material.io/components/web/catalog/dialogs/)

## Standard Usage

```jsx render
import {
  Dialog,
  DefaultDialogTemplate,
  DialogSurface,
  DialogHeader,
  DialogHeaderTitle,
  DialogBody,
  DialogFooter,
  DialogFooterButton,
  DialogBackdrop
} from 'rmwc/Dialog';

import { Button } from 'rmwc/Button';

{/** Standard dialog usage */}
<Dialog
  open={this.state.standardDialogOpen}
  onClose={evt => this.setState({standardDialogOpen: false})}
>
  <DialogSurface>
    <DialogHeader>
      <DialogHeaderTitle>Dialog Title</DialogHeaderTitle>
    </DialogHeader>
    <DialogBody>This is a standard dialog.</DialogBody>
    <DialogFooter>
        <DialogFooterButton cancel>Cancel</DialogFooterButton>
        <DialogFooterButton accept>Sweet!</DialogFooterButton>
    </DialogFooter>
  </DialogSurface>
  <DialogBackdrop />
</Dialog>

<Button
  raised
  onClick={evt => this.setState({standardDialogOpen: true})}
>
  Open standard Dialog
</Button>
```

## Simplified Usage

```jsx render
import { SimpleDialog } from 'rmwc/Dialog';
import { Button } from 'rmwc/Button';

{/** Simple Dialog usage */}
<SimpleDialog
  title="This is a simple dialog"
  body="You can pass the body prop, or anything you want as children."
  open={this.state.simpleDialogIsOpen}
  onClose={evt => this.setState({simpleDialogIsOpen: false})}
  onAccept={evt => console.log('Accepted')}
  onCancel={evt => console.log('Cancelled')}
/>


<Button
  raised
  onClick={evt => this.setState({simpleDialogIsOpen: true})}
>
  Open Simple Dialog
</Button>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="Dialog" />
<DocumentComponent displayName="DialogSurface" />
<DocumentComponent displayName="DialogHeader" />
<DocumentComponent displayName="DialogHeaderTitle" />
<DocumentComponent displayName="DialogBody" />
<DocumentComponent displayName="DialogFooter" />
<DocumentComponent displayName="DialogFooterButton" />
<DocumentComponent displayName="DialogBackdrop" />
<DocumentComponent displayName="SimpleDialog" />
```
