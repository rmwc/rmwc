# Top App Bar

> Top App Bar acts as a container for items such as application title, navigation icon, and action items.

-   Module __@rmwc/top-app-bar__
-   Import styles:
    -   Using CSS Loader
        -   import __'@rmwc/top-app-bar/styles';__
    -   Or include stylesheets
        -   __'@material/top-app-bar/dist/mdc.top-app-bar.css'__;
        -   __'@material/icon-button/dist/mdc.icon-button.css'__;
        -   __'@material/ripple/dist/mdc.ripple.css'__;
        -   __'@rmwc/icon/icon.css'__;
-   MDC Docs: [https://material.io/develop/web/components/top-app-bar/](https://material.io/develop/web/components/top-app-bar/)

Whats the difference between the TopAppBar and Toolbar? Toolbar is technically deprecated (although it still works just fine). TopAppBar functionality continues to be worked on by the `material-components-web` team.

## Basic Usage

Default

```js

<\>

  <TopAppBar\>

    <TopAppBarRow\>

      <TopAppBarSection\>

        <TopAppBarTitle\>Default</TopAppBarTitle\>

      </TopAppBarSection\>

    </TopAppBarRow\>

  </TopAppBar\>

  <TopAppBarFixedAdjust />

  <div style\={{ height: '100rem', padding: '1rem' }}\>Scroll Me</div\>

</\>


```

Fully Featured

```js

<\>

  <TopAppBar\>

    <TopAppBarRow\>

      <TopAppBarSection alignStart\>

        <TopAppBarNavigationIcon icon\="menu" />

        <TopAppBarTitle\>All Features</TopAppBarTitle\>

      </TopAppBarSection\>

      <TopAppBarSection alignEnd\>

        <TopAppBarActionItem icon\="favorite" />

        <TopAppBarActionItem icon\="star" />

        <TopAppBarActionItem icon\="mood" />

      </TopAppBarSection\>

    </TopAppBarRow\>

    <TopAppBarRow\>

      <TopAppBarSection alignStart\>

        <TopAppBarTitle\>Another Row</TopAppBarTitle\>

      </TopAppBarSection\>

    </TopAppBarRow\>

  </TopAppBar\>

  <TopAppBarFixedAdjust />

  <div style\={{ height: '100rem', padding: '1rem' }}\>Scroll Me</div\>

</\>


```

## Simplified Usage

You can use the `SimpleTopAppBar` component which contains a default template already laid out for you. Specify any actions you want as an array of props

Simple

```js

<\>

  <SimpleTopAppBar

    title\="test"

    navigationIcon

    onNav\={() \=> console.log('Navigate')}

    actionItems\={\[

      {

        icon: 'file\_download',

        onClick: () \=> console.log('Do Something')

      },

      { icon: 'print', onClick: () \=> console.log('Do Something') },

      { icon: 'bookmark', onClick: () \=> console.log('Do Something') }

    \]}

  />

  <TopAppBarFixedAdjust />

  <div style\={{ height: '100rem', padding: '1rem' }}\>Scroll Me</div\>

</\>


```

## Variants

Fixed

```js

<\>

  <TopAppBar fixed\>

    <TopAppBarRow\>

      <TopAppBarSection\>

        <TopAppBarTitle\>Fixed</TopAppBarTitle\>

      </TopAppBarSection\>

    </TopAppBarRow\>

  </TopAppBar\>

  <TopAppBarFixedAdjust />

  <div style\={{ height: '100rem', padding: '1rem' }}\>Scroll Me</div\>

</\>


```

Dense

```js

<\>

  <TopAppBar dense\>

    <TopAppBarRow\>

      <TopAppBarSection\>

        <TopAppBarTitle\>Dense</TopAppBarTitle\>

      </TopAppBarSection\>

    </TopAppBarRow\>

  </TopAppBar\>

  <TopAppBarFixedAdjust />

  <div style\={{ height: '100rem', padding: '1rem' }}\>Scroll Me</div\>

</\>


```

Short

```js

<\>

  {/\*\* Additionally you can specify shortCollapsed to have it always minimized \*/}

  <TopAppBar short\>

    <TopAppBarRow\>

      <TopAppBarSection\>

        <TopAppBarNavigationIcon icon\="menu" />

        <TopAppBarTitle\>Short</TopAppBarTitle\>

      </TopAppBarSection\>

      <TopAppBarSection alignEnd\>

        <TopAppBarActionItem icon\="favorite" />

      </TopAppBarSection\>

    </TopAppBarRow\>

  </TopAppBar\>

  <TopAppBarFixedAdjust />

  <div style\={{ height: '100rem', padding: '1rem' }}\>Scroll Me</div\>

</\>


```

Prominent

```js

<\>

  <TopAppBar prominent\>

    <TopAppBarRow\>

      <TopAppBarSection\>

        <TopAppBarTitle\>Prominent</TopAppBarTitle\>

      </TopAppBarSection\>

    </TopAppBarRow\>

  </TopAppBar\>

  <TopAppBarFixedAdjust />

  <div style\={{ height: '100rem', padding: '1rem' }}\>Scroll Me</div\>

</\>


```

## TopAppBar

## TopAppBarRow

## TopAppBarSection

## TopAppBarTitle

## TopAppBarNavigationIcon

## TopAppBarActionItem

## TopAppBarFixedAdjust

## SimpleTopAppBar