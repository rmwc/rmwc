# Dialogs

> Dialogs inform users about a specific task and may contain critical information, require decisions, or involve multiple tasks.

- Module **@rmwc/- Module **@rmwc/dialog****
- Import styles:
  - import **'@material/dialog/dist/mdc.dialog.css'**
  - import **'@material/button/dist/mdc.button.css'**
- MDC Docs: [https://material.io/develop/web/components/dialogs/](https://material.io/develop/web/components/dialogs/)

## Standard Usage

```jsx
function Example() {
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
}
```

## Simplified Usage

Material Dialogs are a complex component. RMWC contains an additional `SimpleDialog` component for ease of use that internally contains the default structure already built out. Illustrated below is both the standard and simple dialog usage.

```jsx
function Example() {
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
}
```

## Dialog
### Props

| Name | Type | Description |
|------|------|-------------|
| `onClose` | `undefined | (evt: RMWC.CustomEventT<>) => void` | Callback for when the Dialog closes. |
| `onOpen` | `undefined | (evt: RMWC.CustomEventT<{}>) => void` | Callback for when the Dialog opens. |
| `onStateChange` | `undefined | (state: "opening" | "opened" | "closing" | "closed") => void` | Callback to use if you need more direct access to the Dialog's lifecycle. |
| `open` | `undefined | false | true` | Whether or not the Dialog is showing. |
| `preventOutsideDismiss` | `undefined | false | true` | Prevent the dialog from closing when the scrim is clicked. |


## DialogTitle


## DialogContent


## DialogActions


## DialogButton
### Props

| Name | Type | Description |
|------|------|-------------|
| `action` | `undefined | string` | An action returned in evt.detail.action to the onClose handler. |
| `children` | `React.ReactNode` | Content specified as children. |
| `dense` | `undefined | false | true` | Make the Button dense. |
| `disabled` | `undefined | false | true` | Make the button disabled |
| `icon` | `RMWC.IconPropT` | An Icon for the Button |
| `isDefaultAction` | `undefined | false | true` | Indicates this is the default selected action when pressing enter |
| `label` | `React.ReactNode | any` | Content specified as a label prop. |
| `outlined` | `undefined | false | true` | Make the button outlined. |
| `raised` | `undefined | false | true` | Make the Button raised. |
| `ripple` | `RipplePropT` | Adds a ripple effect to the component |
| `trailingIcon` | `RMWC.IconPropT` | A trailing icon for the Button |
| `unelevated` | `undefined | false | true` | Make the button unelevated. |


## 


