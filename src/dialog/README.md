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
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';

import { Button } from '@rmwc/button';

{/** Standard dialog usage */}
<Dialog
  open={this.state.standardDialogOpen}
  onClose={evt => {
    console.log(evt.detail.action)
    this.setState({standardDialogOpen: false})
  }}
>    
  <DialogTitle>Dialog Title</DialogTitle>
  <DialogContent>This is a standard dialog.</DialogContent>
  <DialogActions>
    <DialogButton action="close">Cancel</DialogButton>
    <DialogButton action="accept" isDefaultAction>Sweet!</DialogButton>
  </DialogActions>
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
  onClose={evt => {
    console.log(evt.detail.action)
    this.setState({simpleDialogIsOpen: false})
  }}
/>


<Button
  raised
  onClick={evt => this.setState({simpleDialogIsOpen: true})}
>
  Open Simple Dialog
</Button>
```

```jsx renderOnly
import { DocProps } from '../doc-utils';
import * as docs from './generated-props.json';

<DocProps src={docs} components={[
  'Dialog',
  'DialogTitle',
  'DialogContent',
  'DialogActions',
  'DialogButton',
  'SimpleDialog'
]} />
```
