# Tabs

> Tabs make it easy to explore and switch between different views.

import from **rmwc/Tabs**  
[https://material.io/components/web/catalog/tabs/](https://material.io/components/web/catalog/tabs/)

```jsx render
import { TabBar, Tab, TabBarScroller } from 'rmwc/Tabs';

<TabBar
  activeTabIndex={this.state.activeTabIndex || 0}
  onChange={evt => this.setState({'activeTabIndex': evt.target.value})}
>
  <Tab>Cookies</Tab>
  <Tab>Pizza</Tab>
  <Tab>Icecream</Tab>
</TabBar>

{/* TabBar wrapped in TabBarScroller */}
<TabBarScroller>
  <TabBar
    activeTabIndex={this.state.activeTabWithScrollerIndex || 0}
    onChange={evt => this.setState({'activeTabWithScrollerIndex': evt.target.value})}
  >
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
</TabBarScroller>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/DocumentComponent';

<DocumentComponent displayName="TabBar" />
<DocumentComponent displayName="Tab" />
<DocumentComponent displayName="TabBarScroller" />
```
