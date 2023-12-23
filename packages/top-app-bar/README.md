# Top App Bar

Top App Bar acts as a container for items such as application title, navigation icon, and action items.

- Module **@rmwc/top-app-bar**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/top-app-bar/styles';
  - Or include stylesheets
    - **'@material/top-app-bar/dist/mdc.top-app-bar.css'**
    - **'@material/icon-button/dist/mdc.icon-button.css'**
    - **'@material/ripple/dist/mdc.ripple.css'**
    - **'@rmwc/icon/icon.css'**
- MDC Docs: [https://material.io/develop/web/components/top-app-bar/](https://material.io/develop/web/components/top-app-bar/)

Whats the difference between the TopAppBar and Toolbar? Toolbar is technically deprecated (although it still works just fine). TopAppBar functionality continues to be worked on by the `material-components-web` team.

## Basic Usage

```jsx
<>
  <TopAppBar>
    <TopAppBarRow>
      <TopAppBarSection>
        <TopAppBarTitle>Default</TopAppBarTitle>
      </TopAppBarSection>
    </TopAppBarRow>
  </TopAppBar>
  <TopAppBarFixedAdjust />

  <div style={{ height: '100rem', padding: '1rem' }}>Scroll Me</div>
</>
```

```jsx
<>
  <TopAppBar>
    <TopAppBarRow>
      <TopAppBarSection alignStart>
        <TopAppBarNavigationIcon icon="menu" />
        <TopAppBarTitle>All Features</TopAppBarTitle>
      </TopAppBarSection>
      <TopAppBarSection alignEnd>
        <TopAppBarActionItem icon="favorite" />
        <TopAppBarActionItem icon="star" />
        <TopAppBarActionItem icon="mood" />
      </TopAppBarSection>
    </TopAppBarRow>
    <TopAppBarRow>
      <TopAppBarSection alignStart>
        <TopAppBarTitle>Another Row</TopAppBarTitle>
      </TopAppBarSection>
    </TopAppBarRow>
  </TopAppBar>
  <TopAppBarFixedAdjust />

  <div style={{ height: '100rem', padding: '1rem' }}>Scroll Me</div>
</>
```

## Simplified Usage

You can use the `SimpleTopAppBar` component which contains a default template already laid out for you. Specify any actions you want as an array of props

```jsx
<>
  <SimpleTopAppBar
    title="test"
    navigationIcon
    onNav={() => console.log('Navigate')}
    actionItems={[
      {
        icon: 'file_download',
        onClick: () => console.log('Do Something')
      },
      { icon: 'print', onClick: () => console.log('Do Something') },
      { icon: 'bookmark', onClick: () => console.log('Do Something') }
    ]}
  />
  <TopAppBarFixedAdjust />

  <div style={{ height: '100rem', padding: '1rem' }}>Scroll Me</div>
</>
```

## Variants

```jsx
<>
  <TopAppBar fixed>
    <TopAppBarRow>
      <TopAppBarSection>
        <TopAppBarTitle>Fixed</TopAppBarTitle>
      </TopAppBarSection>
    </TopAppBarRow>
  </TopAppBar>
  <TopAppBarFixedAdjust />

  <div style={{ height: '100rem', padding: '1rem' }}>Scroll Me</div>
</>
```

```jsx
<>
  <TopAppBar dense>
    <TopAppBarRow>
      <TopAppBarSection>
        <TopAppBarTitle>Dense</TopAppBarTitle>
      </TopAppBarSection>
    </TopAppBarRow>
  </TopAppBar>
  <TopAppBarFixedAdjust />

  <div style={{ height: '100rem', padding: '1rem' }}>Scroll Me</div>
</>
```

```jsx
<>
  {/** Additionally you can specify shortCollapsed to have it always minimized */}
  <TopAppBar short>
    <TopAppBarRow>
      <TopAppBarSection>
        <TopAppBarNavigationIcon icon="menu" />
        <TopAppBarTitle>Short</TopAppBarTitle>
      </TopAppBarSection>
      <TopAppBarSection alignEnd>
        <TopAppBarActionItem icon="favorite" />
      </TopAppBarSection>
    </TopAppBarRow>
  </TopAppBar>
  <TopAppBarFixedAdjust />

  <div style={{ height: '100rem', padding: '1rem' }}>Scroll Me</div>
</>
```

```jsx
<>
  <TopAppBar prominent>
    <TopAppBarRow>
      <TopAppBarSection>
        <TopAppBarTitle>Prominent</TopAppBarTitle>
      </TopAppBarSection>
    </TopAppBarRow>
  </TopAppBar>
  <TopAppBarFixedAdjust />

  <div style={{ height: '100rem', padding: '1rem' }}>Scroll Me</div>
</>
```

## TopAppBar

---

TopAppBar

---

### Props

| Name             | Type                                    | Description                                                                                                                                                                                                                                                 |
| ---------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dense`          | `boolean`                               | Styles the top app bar to be dense.                                                                                                                                                                                                                         |
| `fixed`          | `boolean`                               | Styles the top app bar as a fixed top app bar.                                                                                                                                                                                                              |
| `foundationRef`  | `Ref<null \| MDCTopAppBarFoundation<>>` | Advanced: A reference to the MDCFoundation.                                                                                                                                                                                                                 |
| `onNav`          | `(evt: TopAppBarOnNavEventT) => void`   | Emits when the navigation icon is clicked.                                                                                                                                                                                                                  |
| `prominent`      | `boolean`                               | Styles the top app bar as a prominent top app bar.                                                                                                                                                                                                          |
| `scrollTarget`   | `null \| Element<>`                     | Set a scrollTarget other than the window when you are using the TopAppBar inside of a nested scrolling DOM Element. Please note that you should store your scrollTarget in a stateful variable. See example https://codesandbox.io/s/reverent-austin-16zzi. |
| `short`          | `boolean`                               | Styles the top app bar as a short top app bar.                                                                                                                                                                                                              |
| `shortCollapsed` | `boolean`                               | Styles the top app bar to always be collapsed.                                                                                                                                                                                                              |

## TopAppBarRow

A row for the app bar.

## TopAppBarSection

A section for the app bar.

### Props

| Name         | Type      | Description                      |
| ------------ | --------- | -------------------------------- |
| `alignEnd`   | `boolean` | Aligns the section to the end.   |
| `alignStart` | `boolean` | Aligns the section to the start. |

## TopAppBarTitle

A title for the top app bar.

## TopAppBarNavigationIcon

A navigation icon for the top app bar. This is an instance of the Icon component.

## TopAppBarActionItem

Action items for the top app bar. This is an instance of the Icon component.

## TopAppBarFixedAdjust

An optional component to fill the space when the TopAppBar is fixed. Place it directly after the TopAppBar.

### Props

| Name             | Type      | Description                                                                                                                                 |
| ---------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `dense`          | `boolean` | Class used to style the content below the dense top app bar to prevent the top app bar from covering it.                                    |
| `denseProminent` | `boolean` | Class used to style the content below the top app bar when styled as both prominent and dense, to prevent the top app bar from covering it. |
| `prominent`      | `boolean` | Class used to style the content below the prominent top app bar to prevent the top app bar from covering it.                                |
| `short`          | `boolean` | Class used to style the content below the short top app bar to prevent the top app bar from covering it.                                    |

## SimpleTopAppBar

A simplified syntax for creating an AppBar.

### Props

| Name             | Type                                    | Description                                                                                        |
| ---------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `actionItems`    | `Object[]`                              | An array of props that will be used to create TopAppBarActionItems.                                |
| `dense`          | `boolean`                               | Styles the top app bar to be dense.                                                                |
| `endContent`     | `ReactNode`                             | Additional content to place in the end section.                                                    |
| `fixed`          | `boolean`                               | Styles the top app bar as a fixed top app bar.                                                     |
| `foundationRef`  | `Ref<null \| MDCTopAppBarFoundation<>>` | Advanced: A reference to the MDCFoundation.                                                        |
| `navigationIcon` | `boolean \| Object`                     | Props for the NavigationIcon, which is an instance of the Icon component. You can also set this to |

`true`
and use the
`onNav`
prop to handle interactions. |
| `onNav` | `(evt: TopAppBarOnNavEventT) => void` | Emits when the navigation icon is clicked. |
| `prominent` | `boolean` | Styles the top app bar as a prominent top app bar. |
| `scrollTarget` | `null \| Element<>` | Set a scrollTarget other than the window when you are using the TopAppBar inside of a nested scrolling DOM Element. Please note that you should store your scrollTarget in a stateful variable. See example https://codesandbox.io/s/reverent-austin-16zzi. |
| `short` | `boolean` | Styles the top app bar as a short top app bar. |
| `shortCollapsed` | `boolean` | Styles the top app bar to always be collapsed. |
| `startContent` | `ReactNode` | Additional content to place in the start section. |
| `title` | `ReactNode` | The title for the App Bar. |
