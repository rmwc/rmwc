# Segmented Button

Segmented buttons allow users to toggle the selected states of grouped buttons.

- Module **@rmwc/segmented-button**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/segmented-button/styles';
  - Or include stylesheets
    - **'@material/segmented-button/dist/mdc.segmented-button.css'**
    - **'@rmwc/@rmwc/icon/icon.css'**
    - **'@material/ripple/dist/mdc.ripple.css'**
- MDC Docs: [https://material.io/develop/web/components/segmented-button/](https://material.io/develop/web/components/segmented-button/)

```jsx
function Example() {
  const [selected, setSelected] = React.useState({
    cookies: false,
    pizza: false,
    icecream: false
  });
  const toggleSelected = (key) =>
    setSelected({ ...selected, [key]: !selected[key] });
  return (
    <SegmentedButton>
      <Segment
        icon="favorite"
        value="cookies"
        onClick={() => toggleSelected('cookies')}
        selected={selected.cookies}
      />
      <Segment
        label="Button"
        value="pizza"
        onClick={() => toggleSelected('pizza')}
        selected={selected.pizza}
      />
      <Segment
        icon="favorite"
        label="Button"
        value="icecream"
        onClick={() => toggleSelected('icecream')}
        selected={selected.icecream}
      />
    </SegmentedButton>
  );
}
```

```jsx
function Example() {
  const [selected, setSelected] = React.useState('icecream');
  return (
    <SegmentedButton selectType="single">
      <Segment
        icon="favorite"
        value="cookies"
        onClick={(evt) => setSelected(evt.currentTarget.value)}
        selected={selected === 'cookies'}
      />
      <Segment
        label="Button"
        value="pizza"
        onClick={(evt) => setSelected(evt.currentTarget.value)}
        selected={selected === 'pizza'}
      />
      <Segment
        icon="favorite"
        label="Button"
        value="icecream"
        onClick={(evt) => setSelected(evt.currentTarget.value)}
        selected={selected === 'icecream'}
      />
    </SegmentedButton>
  );
}
```

```jsx
<>
  {/** Wrapping a button in TouchTargetWrapper will automatically set its `touch` prop to true. */}
  <TouchTargetWrapper>
    <Segment>Touch Accessible</Segment>
  </TouchTargetWrapper>
</>
```

## SegmentedButton

### Props

| Name         | Type                     | Description                                                                                               |
| ------------ | ------------------------ | --------------------------------------------------------------------------------------------------------- |
| `selectType` | `"multiple" \| "single"` | Determines whether the user is able to select multiple or a single button at a time. Default to multiple. |
