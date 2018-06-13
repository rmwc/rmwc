# Tabs

> Tabs make it easy to explore and switch between different views.

import from **rmwc/Tabs**  
[https://material.io/components/web/catalog/tabs/](https://material.io/components/web/catalog/tabs/)

```jsx render
import { TabBar, Tab, TabIcon, TabIconText, TabBarScroller } from 'rmwc/Tabs';

<TabBar
  activeTabIndex={this.state.activeTabIndex}
  onChange={evt => this.setState({'activeTabIndex': evt.detail.activeTabIndex})}
>
  <Tab>Cookies</Tab>
  <Tab>Pizza</Tab>
  <Tab>Icecream</Tab>
</TabBar>

<TabBar
  activeTabIndex={this.state.activeTabIndex2}
  onChange={evt => this.setState({'activeTabIndex2': evt.detail.activeTabIndex})}
>
  <Tab><TabIcon>star_border</TabIcon></Tab>
  <Tab><TabIcon>favorite_border</TabIcon></Tab>
  <Tab><TabIcon>mood</TabIcon></Tab>
</TabBar>

<TabBar
  activeTabIndex={this.state.activeTabIndex3}
  onChange={evt => this.setState({'activeTabIndex3': evt.detail.activeTabIndex})}
>
  <Tab><TabIcon>star_border</TabIcon><TabIconText>Featured</TabIconText></Tab>
  <Tab><TabIcon>favorite_border</TabIcon><TabIconText>Favorites</TabIconText></Tab>
  <Tab><TabIcon>mood</TabIcon><TabIconText>Feedback</TabIconText></Tab>
</TabBar>

{/* TabBar wrapped in TabBarScroller */}
<TabBarScroller>
  <TabBar
    activeTabIndex={this.state.activeTabIndex4}
    onChange={evt => this.setState({'activeTabIndex4': evt.detail.activeTabIndex})}
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
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="TabBar" />
<DocumentComponent displayName="Tab" />
<DocumentComponent displayName="TabIcon" />
<DocumentComponent displayName="TabIconText" />
<DocumentComponent displayName="TabBarScroller" />
```
