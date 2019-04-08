# Snackbars

> Snackbars provide brief feedback about an operation through a message at the bottom of the screen.

- Module **@rmwc/snackbar**  
- Import styles:
  - import **'@material/snackbar/dist/mdc.snackbar.css'**;
  - import **'@material/button/dist/mdc.button.css'**;
- MDC Docs: [https://material.io/develop/web/components/snackbars/](https://material.io/develop/web/components/snackbars/)

```jsx render
import { Snackbar, SnackbarAction } from '@rmwc/snackbar';
import { Button } from '@rmwc/button';

{/* A standard snackbar */}
<Snackbar
  open={this.state.snackbarIsOpen}
  onClose={evt => this.setState({snackbarIsOpen: false})}
  message="This is a new message"
  action={
    <SnackbarAction
      label="Dismiss"
      onClick={() => console.log('Click Me')}
    />}
/>

<Button
  raised
  label="Show snackbar"
  onClick={evt => this.setState({snackbarIsOpen: !this.state.snackbarIsOpen})}
/>

{/* A snackbar that is start aligned on larger devices. */}
<Snackbar
  open={this.state.snackbarStartIsOpen}
  onClose={evt => this.setState({snackbarStartIsOpen: false})}
  message="Start aligned"
  stacked
  action={[
    <SnackbarAction
      label="Yeah!"
    />, 
    <SnackbarAction
      label="No..."
    />
  ]}
  leading
  timeout={10000}
/>

<Button
  label="Show start-aligned"
  onClick={evt => this.setState({snackbarStartIsOpen: !this.state.snackbarStartIsOpen})}
/>
```

```jsx renderOnly
import { DocProps } from '../doc-utils';
import { default as docs}  from './generated-props.json';

<DocProps src={docs} components={['Snackbar']} />
```
