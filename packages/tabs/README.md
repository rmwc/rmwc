# Tabs

> Tabs make it easy to explore and switch between different views.

-   Module __@rmwc/tabs__
-   Import styles:
    -   Using CSS Loader
        -   import __'@rmwc/tabs/styles';__
    -   Or include stylesheets
        -   __'@material/tab-bar/dist/mdc.tab-bar.css'__;
        -   __'@material/tab/dist/mdc.tab.css'__;
        -   __'@material/tab-scroller/dist/mdc.tab-scroller.css'__;
        -   __'@material/tab-indicator/dist/mdc.tab-indicator.css'__;
        -   __'@material/ripple/dist/mdc.ripple.css'__;
        -   __'@rmwc/icon/icon.css'__;
-   MDC Docs: [https://material.io/develop/web/components/tabs/tab-bar/](https://material.io/develop/web/components/tabs/tab-bar/)

## Basic Usage

Tabs can be either controlled or uncontrolled just like inputs. Use the `activeTabIndex` and `onActivate` callback for controlled components.

Uncontrolled

```js

<TabBar\>

  <Tab\>Cookies</Tab\>

  <Tab\>Pizza</Tab\>

  <Tab\>Icecream</Tab\>

</TabBar\>


```

Controlled

```js

function Example() {

  const \[activeTab, setActiveTab\] \= React.useState(0);

  return (

    <TabBar

      activeTabIndex\={activeTab}

      onActivate\={(evt) \=> setActiveTab(evt.detail.index)}

    \>

      <Tab\>Cookies</Tab\>

      <Tab\>Pizza</Tab\>

      <Tab\>Icecream</Tab\>

    </TabBar\>

  );

}


```

## Variants

Basic

```js

<TabBar\>

  <Tab\>Cookies</Tab\>

  <Tab\>Pizza</Tab\>

  <Tab\>Icecream</Tab\>

</TabBar\>


```

With Icons

```js

<TabBar\>

  <Tab icon\="star\_border" label\="Cookies" />

  <Tab icon\="favorite\_border" label\="Pizza" />

  <Tab icon\="mood" label\="Icecream" />

</TabBar\>


```

Icons Only

```js

<TabBar\>

  <Tab icon\="star\_border" />

  <Tab icon\="favorite\_border" />

  <Tab icon\="mood" />

</TabBar\>


```

Stacked

```js

<TabBar\>

  <Tab stacked icon\="star\_border" label\="Cookies" />

  <Tab stacked icon\="favorite\_border" label\="Pizza" />

  <Tab stacked icon\="mood" label\="Icecream" />

</TabBar\>


```

Restricted Indicator

```js

<TabBar\>

  <Tab stacked restrictIndicator icon\="star\_border" label\="Cookies" />

  <Tab stacked restrictIndicator icon\="favorite\_border" label\="Pizza" />

  <Tab stacked restrictIndicator icon\="mood" label\="Icecream" />

</TabBar\>


```

Scrollable

```js

<TabBar\>

  {/\* Tabs automatically scroll with lots of content. \*/}

  <Tab\>Cookies</Tab\>

  <Tab\>Pizza</Tab\>

  <Tab\>Icecream</Tab\>

  <Tab\>Chocolate</Tab\>

  <Tab\>Fishsticks</Tab\>

  <Tab\>Ratatouille</Tab\>

  <Tab\>Bread</Tab\>

  <Tab\>Rolls</Tab\>

  <Tab\>Sushi</Tab\>

  <Tab\>Cupcake</Tab\>

  <Tab\>Cheesecake</Tab\>

</TabBar\>


```

## Transitions

Slide (Default)

```js

<TabBar\>

  <Tab\>Cookies</Tab\>

  <Tab\>Pizza</Tab\>

  <Tab\>Icecream</Tab\>

</TabBar\>


```

## Icons as Indicators

`material-components-web` has some light support for using icons as indicators (it's buried in their docs but there are no working examples or demos). Support has been added to RMWC, but your mileage may vary since it will require quite a bit of manual positioning and styling. By default, the icons appear full size at the center of the tab, effectively making them overlay images.

Default Positioning

```js

<TabBar\>

  <Tab iconIndicator\="star"\>Cookies</Tab\>

  <Tab iconIndicator\="favorite"\>Pizza</Tab\>

  <Tab iconIndicator\="mood"\>Icecream</Tab\>

</TabBar\>


```

Manually Positioned

```js

<\>

  {function IconIndicatorExample() {

    const style \= {

      transformOrigin: 'center center',

      transform: 'translateY(1rem) scale(0.45)'

    };

    return (

      <TabBar\>

        <Tab

          label\="Cookies"

          iconIndicator\={{

            icon: 'star',

            style: style

          }}

        />

        <Tab

          label\="Pizza"

          iconIndicator\={{

            icon: 'favorite',

            style: style

          }}

        />

        <Tab

          label\="Icecream"

          iconIndicator\={{

            icon: 'mood',

            style: style

          }}

        />

      </TabBar\>

    );

  }}

</\>


```

## TabBar

## Tab