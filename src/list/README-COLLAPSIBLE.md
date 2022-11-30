# Collapsible Lists `RMWC ADDON`

Lists are continuous, vertical indexes of text or images.

- Module **@rmwc/list**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/list/styles';
  - Or include stylesheets
    - **'@material/list/dist/mdc.list.css'**
    - **'@rmwc/list/collapsible-list.css'**


Collapsible lists aren't part of the material spec, but they've been added to RMWC after continuing requests from the community. They present an accordion style navigation element to progressively reveal content. They've have been built to work with the `List` and `ListItem` components in regards to keyboard events and styling, but they technically be used with any kind of content.

```jsx
<List>
  <CollapsibleList
    handle={
      <SimpleListItem
        text="Cookies"
        graphic="favorite"
        metaIcon="chevron_right"
      />
    }
    onOpen={() => console.log('open')}
    onClose={() => console.log('close')}
  >
    <SimpleListItem text="Chocolate Chip" />
    <SimpleListItem text="Ginger Snap" />
    <SimpleListItem text="Peanut Butter" />
  </CollapsibleList>

  <CollapsibleList
    handle={
      <SimpleListItem
        text="Pizza"
        graphic="local_pizza"
        metaIcon="chevron_right"
      />
    }
  >
    <SimpleListItem text="Cheese" />
    <SimpleListItem text="Pepperoni" />
    <SimpleListItem text="Supreme" />
  </CollapsibleList>

  <CollapsibleList
    handle={
      <SimpleListItem
        text="Icecream"
        graphic="star"
        metaIcon="chevron_right"
      />
    }
  >
    <SimpleListItem text="Vanilla" />
    <SimpleListItem text="Chocolate" />
    <CollapsibleList
      handle={
        <SimpleListItem
          text="Nested Collapsible"
          graphic="touch_app"
          metaIcon="chevron_right"
        />
      }
    >
      <SimpleListItem text="Orange" />
      <SimpleListItem text="Strawberry" />
      <SimpleListItem text="Blueberry" />
    </CollapsibleList>
  </CollapsibleList>

  <CollapsibleList
    open
    handle={
      <SimpleListItem
        text="Custom Content, forced open"
        graphic="help"
        metaIcon="chevron_right"
      />
    }
  >
    <div
      style={{
        padding: '4rem',
        background: 'green',
        color: 'white'
      }}
    >
      Collapsibles can contain any content
    </div>
  </CollapsibleList>
</List>
```

## Usage as Non-List

`CollapsibleList` is optimized to work with the `List` component but there is nothing stopping you from using any other kind of content.

```jsx
<CollapsibleList
  handle={<IconButton icon="favorite_outline" onIcon="favorite" />}
  onOpen={() => console.log('open')}
  onClose={() => console.log('close')}
>
  <div
    style={{
      padding: '1rem',
      background: 'red',
      color: 'white',
      display: 'inline-block'
    }}
  >
    Favorited!
  </div>
</CollapsibleList>
```

## CollapsibleList
A collapsible list component.

### Props

| Name | Type | Description |
|------|------|-------------|
| `defaultOpen` | `undefined \| false \| true` | Starts the collapsible list as open. |
| `handle` | `ReactElement<any>` | The handle that opens and closes the collapsible section. Usually a ListItem. |
| `onClose` | `undefined \| () => void` | Callback for when the collapsible list closes. |
| `onOpen` | `undefined \| () => void` | Callback for when the collapsible list opens. |
| `open` | `undefined \| false \| true` | Show the collapsible list as open. |


