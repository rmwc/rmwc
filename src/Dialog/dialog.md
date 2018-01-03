# Dialogs

> Dialogs inform users about a specific task and may contain critical information, require decisions, or involve multiple tasks.

import from **rmwc/Dialog**  
[https://material.io/components/web/catalog/dialogs/](https://material.io/components/web/catalog/dialogs/)

```jsx render
import {
  Dialog,
  DefaultDialogTemplate,
  DialogRoot,
  DialogSurface,
  DialogHeader,
  DialogHeaderTitle,
  DialogBody,
  DialogFooter,
  DialogFooterButton,
  DialogBackdrop
} from 'rmwc/Dialog';

import { Button } from 'rmwc/Button';

{/** Simple Dialogs for basic usage **/}
<Dialog
  title="This is a simple dialog"
  body="You can pass the body prop, or anything you want as children."
  open={this.state.simpleDialogIsOpen}
  onClose={evt => this.setState({simpleDialogIsOpen: false})}
  onAccept={evt => console.log('Accepted')}
  onCancel={evt => console.log('Cancelled')}
/>


{/** Compose your own **/}
<Dialog
  open={this.state.customDialogIsOpen}
  onClose={evt => this.setState({customDialogIsOpen: false})}
>
  <DialogRoot>
    <DialogSurface>
        <DialogHeader>
          <DialogHeaderTitle>Dialog Title</DialogHeaderTitle>
        </DialogHeader>
        <DialogBody>This is a custom dialog.</DialogBody>
        <DialogFooter>
            <DialogFooterButton cancel>Cancel</DialogFooterButton>
            <DialogFooterButton accept>Sweet!</DialogFooterButton>
        </DialogFooter>
    </DialogSurface>
    <DialogBackdrop />
  </DialogRoot>
</Dialog>


<Button
  raised
  onClick={evt => this.setState({simpleDialogIsOpen: true})}
>
  Open Simple Dialog
</Button>

<Button
  onClick={evt => this.setState({customDialogIsOpen: true})}
>
  Open Custom Dialog
</Button>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/DocumentComponent';

<DocumentComponent displayName="Dialog" />
<DocumentComponent displayName="DefaultDialogTemplate" />
<DocumentComponent displayName="DialogRoot" />
<DocumentComponent displayName="DialogSurface" />
<DocumentComponent displayName="DialogHeader" />
<DocumentComponent displayName="DialogHeaderTitle" />
<DocumentComponent displayName="DialogBody" />
<DocumentComponent displayName="DialogFooter" />
<DocumentComponent displayName="DialogFooterButton" />
<DocumentComponent displayName="DialogBackdrop" />
```
