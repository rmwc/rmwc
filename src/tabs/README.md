# Tabs

> Tabs make it easy to explore and switch between different views.

- Module **@rmwc/tabs**  
- Import styles:
  - import **'@material/tab-bar/dist/mdc.tab-bar.css'**;
  - import **'@material/tab/dist/mdc.tab.css'**;
  - import **'@material/tab-scroller/dist/mdc.tab-scroller.css'**;
  - import **'@material/tab-indicator/dist/mdc.tab-indicator.css'**;
- MDC Docs: [https://material.io/develop/web/components/tabs/tab-bar/](https://material.io/develop/web/components/tabs/tab-bar/)

## Controlled vs Uncontrolled
Tabs can be either controlled or uncontrolled just like inputs. Use the `activeTabIndex` and `onActivate` callback for controlled components.
```jsx render
import { TabBar, Tab } from '@rmwc/tabs';

{/* Uncontrolled */}
<TabBar>
  <Tab>Cookies</Tab>
  <Tab>Pizza</Tab>
  <Tab>Icecream</Tab>
</TabBar>

{/* Controlled */}
<TabBar
  activeTabIndex={this.state.activeTab}
  onActivate={evt => this.setState({activeTab: evt.detail.index})}
>
  <Tab>Cookies</Tab>
  <Tab>Pizza</Tab>
  <Tab>Icecream</Tab>
</TabBar>

```

## Variants

```jsx render
import { TabBar, Tab } from '@rmwc/tabs';

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
  <Tab>Cheesecake</Tab>
</TabBar>
```

```jsx renderOnly
import { DocProps } from '../doc-utils';
import { default as docs}  from './generated-props.json';

<DocProps src={docs} components={['TabBar', 'Tab']} />
```
