# Tabs

> Tabs make it easy to explore and switch between different views.

import from **rmwc/Tabs**  
[https://material.io/components/web/catalog/tabs/](https://material.io/components/web/catalog/tabs/)

## Controlled vs Uncontrolled
Tabs can be either controlled or uncontrolled just like inputs. Use the `activeTabIndex` and `onActivated` callback for controlled components.
```jsx render
{/* Uncontrolled */}
<TabBar>
  <Tab>Cookies</Tab>
  <Tab>Pizza</Tab>
  <Tab>Icecream</Tab>
</TabBar>

{/* Controlled */}
<TabBar
  activeTabIndex={this.state.activeTab}
  onActivated={evt => this.setState({activeTab: evt.detail.index})}
>
  <Tab>Cookies</Tab>
  <Tab>Pizza</Tab>
  <Tab>Icecream</Tab>
</TabBar>

```

## Variants

```jsx render
import { TabBar, Tab, TabIcon, TabIconText, TabBarScroller } from 'rmwc/Tabs';

{/* Basic Tabs */}
<TabBar>
  <Tab>Cookies</Tab>
  <Tab>Pizza</Tab>
  <Tab>Icecream</Tab>
</TabBar>

{/* With Icons */}
<TabBar>
  <Tab
    icon="star_border"
    label="Cookies"
  />
  <Tab
    icon="favorite_border"
    label="Pizza"
  />
  <Tab
    icon="mood"
    label="Icecream"
  />
</TabBar>

{/* Icons Only */}
<TabBar>
  <Tab icon="star_border" />
  <Tab icon="favorite_border" />
  <Tab icon="mood" />
</TabBar>

{/* Stacked with indicator restricted to labels */}
<TabBar>
  <Tab stacked restrictIndicator icon="star_border" label="Cookies" />
  <Tab stacked restrictIndicator icon="favorite_border" label="Pizza" />
  <Tab stacked restrictIndicator icon="mood" label="Icecream" />
</TabBar>

{/* Tabs automatically scroll with lots of content. */}
<TabBar>
  <Tab>Cookies</Tab>
  <Tab>Pizza</Tab>
  <Tab>Icecream</Tab>
  <Tab>Chocolate</Tab>
  <Tab>Fishsticks</Tab>
  <Tab>Ratatouille</Tab>
  <Tab>Bread</Tab>
  <Tab>Rolls</Tab>
  <Tab>Sushi</Tab>
  <Tab>Cupcake</Tab>
</TabBar>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="TabBar" />
<DocumentComponent displayName="Tab" composes={['Icon']} />
```
