# Snackbars

> Snackbars provide brief feedback about an operation through a message at the bottom of the screen.

- Module **@rmwc/snackbar**
- Import styles:
  - import **'@material/snackbar/dist/mdc.snackbar.css'**
  - import **'@material/button/dist/mdc.button.css'**
- MDC Docs: [https://material.io/develop/web/components/snackbars/](https://material.io/develop/web/components/snackbars/)

```jsx
function Example() {
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
}
```

```jsx
function Example() {
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
}
```

## Snackbar
A Snackbar component for notifications.

### Props

| Name | Type | Description |
|------|------|-------------|
| `action` | `React.ReactNode \| React.ReactNode[]` | One or more actions to add to the snackbar. |
| `dismissIcon` | `boolean \| string` |  |
| `dismissesOnAction` | `undefined \| false \| true` | Whether or not your want clicking an action to close the Snackbar. |
| `leading` | `undefined \| false \| true` |  |
| `message` | `React.ReactNode` | A string or other renderable JSX to be used as the message body. |
| `onClose` | `undefined \| (evt: RMWC.CustomEventT<{}>) => void` | A callback thats fired when the Snackbar hides. |
| `onOpen` | `undefined \| (evt: RMWC.CustomEventT<{}>) => void` | A callback thats fired when the Snackbar shows. |
| `open` | `undefined \| false \| true` | Show the Snackbar. |
| `stacked` | `undefined \| false \| true` | Places the action underneath the message text. |
| `timeout` | `undefined \| number` | Milliseconds to show the Snackbar for. |


## SnackbarAction


