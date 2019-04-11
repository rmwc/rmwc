import React from 'react';

import { Docs, DocsExample, DocProps, DocsSubtitle, DocsP } from '@doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton,
  SimpleDialog
} from '.';

import { Button } from '../button';

export default function() {
  return (
    <Docs
      title="Dialogs"
      lead="Dialogs inform users about a specific task and may contain critical information, require decisions, or involve multiple tasks."
      module="@rmwc/dialog"
      styles={[
        '@material/dialog/dist/mdc.dialog.css',
        '@material/button/dist/mdc.button.css'
      ]}
      docsLink="https://material.io/develop/web/components/dialogs/"
      examples={examples}
    >
      <DocsSubtitle>Standard Usage</DocsSubtitle>

      <DocsExample>
        {function Example() {
          const [open, setOpen] = React.useState(false);
          return (
            <>
              <Dialog
                open={open}
                onClose={evt => {
                  console.log(evt.detail.action);
                  setOpen(false);
                }}
              >
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogContent>This is a standard dialog.</DialogContent>
                <DialogActions>
                  <DialogButton action="close">Cancel</DialogButton>
                  <DialogButton action="accept" isDefaultAction>
                    Sweet!
                  </DialogButton>
                </DialogActions>
              </Dialog>

              <Button raised onClick={() => setOpen(true)}>
                Open standard Dialog
              </Button>
            </>
          );
        }}
      </DocsExample>

      <DocsSubtitle>Simplified Usage</DocsSubtitle>

      <DocsP>
        Material Dialogs are a complex component. RMWC contains an additional
        `SimpleDialog` component for ease of use that internally contains the
        default structure already built out. Illustrated below is both the
        standard and simple dialog usage.
      </DocsP>
      <DocsExample>
        {function Example() {
          const [open, setOpen] = React.useState(false);
          return (
            <>
              <SimpleDialog
                title="This is a simple dialog"
                body="You can pass the body prop or children."
                open={open}
                onClose={evt => {
                  console.log(evt.detail.action);
                  setOpen(false);
                }}
              />

              <Button raised onClick={() => setOpen(true)}>
                Open Simple Dialog
              </Button>
            </>
          );
        }}
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          Dialog,
          DialogTitle,
          DialogContent,
          DialogActions,
          DialogButton,
          SimpleDialog
        ]}
      />
    </Docs>
  );
}
