import React from 'react';

import { Docs, DocsExample, DocProps } from '../doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { Snackbar, SnackbarAction } from '.';
import { Button } from '@rmwc/button';

export default function() {
  return (
    <Docs
      title="Snackbars"
      lead="Snackbars provide brief feedback about an operation through a message at the bottom of the screen."
      module="@rmwc/snackbar"
      styles={[
        '@material/snackbar/dist/mdc.snackbar.css',
        '@material/button/dist/mdc.button.css'
      ]}
      docsLink="https://material.io/develop/web/components/snackbars/"
      examples={examples}
    >
      <DocsExample label="Default">
        {function Example() {
          const [open, setOpen] = React.useState(false);

          return (
            <>
              <Snackbar
                open={open}
                onClose={evt => setOpen(false)}
                message="This is a new message"
                action={
                  <SnackbarAction
                    label="Dismiss"
                    onClick={() => console.log('Click Me')}
                  />
                }
              />

              <Button
                raised
                label="Show snackbar"
                onClick={evt => setOpen(!open)}
              />
            </>
          );
        }}
      </DocsExample>

      <DocsExample label="Start Aligned">
        {function Example() {
          const [open, setOpen] = React.useState(false);

          return (
            <>
              <Snackbar
                open={open}
                onClose={evt => setOpen(false)}
                message="Start aligned"
                stacked
                action={[
                  <SnackbarAction label="Yeah!" />,
                  <SnackbarAction label="No..." />
                ]}
                leading
                timeout={10000}
              />

              <Button
                raised
                label="Show start-aligned"
                onClick={evt => setOpen(!open)}
              />
            </>
          );
        }}
      </DocsExample>

      <DocProps src={propsSrc} components={['Snackbar', 'SnackbarAction']} />
    </Docs>
  );
}
