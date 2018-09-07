# Dialogs

> Dialogs inform users about a specific task and may contain critical information, require decisions, or involve multiple tasks.

Material Dialogs are a complex component. RMWC contains an additional non-standard `SimpleDialog` component for ease of use that internally contains the default structure already built out. Illustrated below is both the strandard and simple dialog usage.

- Module **@rmwc/dialog**
- Import styles:
  - import **'@material/dialog/dist/mdc.dialog.css'**;
  - import **'@material/button/dist/mdc.button.css'**;
- MDC Docs: [https://material.io/develop/web/components/dialogs/](https://material.io/develop/web/components/dialogs/)

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
} from '@rmwc/dialog';

import { Button } from '@rmwc/button';

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
import { SimpleDialog } from '@rmwc/dialog';
import { Button } from '@rmwc/button';

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
import { DocumentComponent } from '@rmwc/base/utils/DocumentComponent';
import * as docs from './docgen.json';

<DocumentComponent docs={docs} displayName="Dialog" />
<DocumentComponent docs={docs} displayName="DialogSurface" />
<DocumentComponent docs={docs} displayName="DialogHeader" />
<DocumentComponent docs={docs} displayName="DialogHeaderTitle" />
<DocumentComponent docs={docs} displayName="DialogBody" />
<DocumentComponent docs={docs} displayName="DialogFooter" />
<DocumentComponent docs={docs} displayName="DialogFooterButton" composes={['Button']} />
<DocumentComponent docs={docs} displayName="DialogBackdrop" />
<DocumentComponent docs={docs} displayName="SimpleDialog" />
```
