Dialogs
=======

> Dialogs inform users about a specific task and may contain critical information, require decisions, or involve multiple tasks.

*   Module **@rmwc/dialog**
*   Import styles:
    *   Using CSS Loader
        *   import **'@rmwc/dialog/styles';**
    *   Or include stylesheets
        *   **'@material/dialog/dist/mdc.dialog.css'**;
        *   **'@material/button/dist/mdc.button.css'**;
        *   **'@material/ripple/dist/mdc.ripple.css'**;
*   MDC Docs: [https://material.io/develop/web/components/dialogs/](https://material.io/develop/web/components/dialogs/)

Standard Usage
--------------

```js

function Example() {

  const \[open, setOpen\] \= React.useState(false);

  return (

    <\>

      <Dialog

        open\={open}

        onClose\={(evt) \=> {

          console.log(evt.detail.action);

          setOpen(false);

        }}

        onClosed\={(evt) \=> console.log(evt.detail.action)}

      \>

        <DialogTitle\>Dialog Title</DialogTitle\>

        <DialogContent\>This is a standard dialog.</DialogContent\>

        <DialogActions\>

          <DialogButton action\="close"\>Cancel</DialogButton\>

          <DialogButton action\="accept" isDefaultAction\>

            Sweet!

          </DialogButton\>

        </DialogActions\>

      </Dialog\>

      <Button raised onClick\={() \=> setOpen(true)}\>

        Open standard Dialog

      </Button\>

    </\>

  );

}


```

Simplified Usage
----------------

Material Dialogs are a complex component. RMWC contains an additional `SimpleDialog` component for ease of use that internally contains the default structure already built out. Illustrated below is both the standard and simple dialog usage.

```js

function Example() {

  const \[open, setOpen\] \= React.useState(false);

  return (

    <\>

      <SimpleDialog

        title\="This is a simple dialog"

        body\="You can pass the body prop or children."

        open\={open}

        onClose\={(evt) \=> {

          console.log(evt.detail.action);

          setOpen(false);

        }}

      />

      <Button raised onClick\={() \=> setOpen(true)}\>

        Open Simple Dialog

      </Button\>

    </\>

  );

}


```

Usage with DialogQueue
----------------------

Some dialog interactions are complex, but a lot of the time you just need a simple alert or confirm dialog. `DialogQueue` allows you to open dialogs from anywhere in your app and emulates the browsers built in `alert`, `confirm` and `prompt` dialogs. If you've used the `SnackbarQueue`, the `DialogQueue` is very similar.

Setup is nice and easy, create a queue object you can pass around in your code base, pass the queues `dialogs` to the `DialogQueue`component, and then use the `alert`, `prompt` or `confirm` api to open dialogs.

```js

\`

// Create a file that exports your queue

// myQueue.js

import { createDialogQueue } from '@rmwc/dialog';

export const queue \= createDialogQueue();


```

```js

\`

// Somewhere at the top level of your app

// Render the DialogQueue

import React from 'react';

import { queue } from './myQueue';

export default function App() {

  return (

    <div\>

      ...

      <DialogQueue

        dialogs\={queue.dialogs}

        // You can also pass default options to pass to your dialogs

        // ie, prevent all dialogs from dismissing from a click on the background scrim

        preventOutsideDismiss

      />

    </div\>

  )

}


```

The `alert`, `confirm`, and `prompt` functions were designed to mimic the the built-in browser methods with a couple of small difference. First, they all return a promise. The promise will always resolve successfully with the response indicating the appropriate action. `alert` the response will be `accept` for clicking the ok button, or `close`. `confirm` will resolve `true` or `false`, and `prompt` will resolve with the value entered into the input, or `null` if the closed the dialog. Second, all methods the methods accept any valid prop for `SimpleDialog`.

```js

\`

// Somewhere else in your app

// Could be a view, your redux store, anywhere you want...

import { queue } from './myQueue';

queue.alert({

  title: 'Hi there',

  body: 'Whats going on?'

});

queue.confirm({

  title: <b\>Are you positive?</b\>,

  body: 'You have selected pizza instead icecream!',

  acceptLabel: 'CONFIRM'

});

queue.prompt({

  title: 'Whats your name?',

  body: 'Anything will do',

  acceptLabel: 'Submit',

  cancelLabel: 'Skip',

  // For prompts only, you can pass props to the input

  inputProps: {

    outlined: true

  }

});


```

Inline Example

```js

() \=> {

  const { dialogs, alert, confirm, prompt } \= createDialogQueue();

  function App() {

    const \[response, setResponse\] \= React.useState('\_\_\_\_\_\_\_\_\_\_\_\_');

    const fireAlert \= () \=>

      alert({ title: 'Hello!' }).then((res) \=> setResponse(res));

    const fireConfirm \= () \=>

      confirm({}).then((res) \=> setResponse(res));

    const firePrompt \= () \=>

      prompt({ inputProps: { outlined: true } }).then((res) \=>

        setResponse(res)

      );

    return (

      <div\>

        <Button label\="Alert" onClick\={fireAlert} />

        <Button label\="Confirm" onClick\={fireConfirm} />

        <Button label\="Prompt" onClick\={firePrompt} />

        <Button

          label\="In Sequence"

          onClick\={() \=> {

            fireAlert();

            fireConfirm();

            firePrompt();

          }}

        />

        <p\>

          Response: <b\>{String(response)}</b\>

        </p\>

        <DialogQueue dialogs\={dialogs} />

      </div\>

    );

  }

  return <App />;

}


```

Rendering through Portals
-------------------------

Occasionally, you may find your dialog being cut off from being inside a container that is styled to be `overflow:hidden`. RMWC provides a `renderToPortal` prop that lets you use React's portal functionality to render the menu dropdown in a different container.

You can specify any element or selector you want, but the simplest method is to pass `true` and use RMWC's built in `Portal` component.

```js

  // Somewhere at the top level of your app

  // Render the RMWC Portal

  // You only have to do this once

  import React from 'react';

  import { Portal } from '@rmwc/base';

  export default function App() {

    return (

      <div\>

        ...

        <Portal />

      </div\>

    )

  }

```

Now you can use the `renderToPortal` prop. Below is a contrived example of a dialog being cut off due to `overflow: hidden`.

```js

function Example() {

  const \[renderToPortal, setRenderToPortal\] \= React.useState(true);

  const \[open, setOpen\] \= React.useState(false);

  return (

    <div

      id\="dialog-portal-example"

      style\={{

        transform: 'translateZ(0)',

        height: '20rem',

        overflow: 'hidden'

      }}

    \>

      <SimpleDialog

        title\={\`This is a ${renderToPortal ? 'working!' : 'broken :/'}\`}

        renderToPortal\={renderToPortal}

        body\="Use \`renderToPortal\` to get around \`overflow:hidden\` and layout issues."

        open\={open}

        onClose\={(evt) \=> {

          console.log(evt.detail.action);

          setOpen(false);

        }}

      />

      <Button

        raised

        onClick\={() \=> {

          setRenderToPortal(false);

          setOpen(true);

        }}

      \>

        Open Broken :/

      </Button\>

      <Button

        raised

        onClick\={() \=> {

          setRenderToPortal(true);

          setOpen(true);

        }}

      \>

        Open in Portal

      </Button\>

    </div\>

  );

}


```

Dialog
------

DialogTitle
-----------

DialogContent
-------------

DialogActions
-------------

DialogButton
------------

SimpleDialog
------------