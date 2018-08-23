# Tabs

> Tabs make it easy to explore and switch between different views.

import from **rmwc/Tabs**  
[https://material.io/components/web/catalog/tabs/](https://material.io/components/web/catalog/tabs/)

```jsx render
import { TabBar, Tab, TabIcon, TabIconText, TabBarScroller } from 'rmwc/Tabs';

<TabBar
  activeTabIndex={this.state.activeTabIndex}
  onActivated={evt => this.setState({'activeTabIndex': evt.detail.index})}
>
  <Tab>Cookies</Tab>
  <Tab>Pizza</Tab>
  <Tab>Icecream</Tab>
</TabBar>

<TabBar
  activeTabIndex={this.state.activeTabIndex2}
  onActivated={evt => this.setState({'activeTabIndex2': evt.detail.index})}
>
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

<TabBar
  activeTabIndex={this.state.activeTabIndex3}
  onActivated={evt => this.setState({'activeTabIndex3': evt.detail.index})}
>
  <Tab icon="star_border" />
  <Tab icon="favorite_border" />
  <Tab icon="mood" />
</TabBar>

<TabBar
  activeTabIndex={this.state.activeTabIndex4}
  onActivated={evt => this.setState({'activeTabIndex4': evt.detail.index})}
>
  <Tab stacked restrictIndicator icon="star_border" label="Cookies" />
  <Tab stacked restrictIndicator icon="favorite_border" label="Pizza" />
  <Tab stacked restrictIndicator icon="mood" label="Icecream" />
</TabBar>

{/* Tabs automatically scroll with lots of content. */}
<TabBar
  activeTabIndex={this.state.activeTabIndex5}
  onActivated={evt => this.setState({'activeTabIndex5': evt.detail.index})}
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
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="TabBar" />
<DocumentComponent displayName="Tab" />
<DocumentComponent displayName="TabIcon" />
<DocumentComponent displayName="TabIconText" />
<DocumentComponent displayName="TabBarScroller" />
```
