import React from 'react';

import { Docs, DocsExample, DocProps, DocsSubtitle, DocsP } from '../doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import { TabBar, Tab } from '.';

export default function() {
  return (
    <Docs
      title="Tabs"
      lead="Tabs make it easy to explore and switch between different views."
      module="@rmwc/tabs"
      styles={[
        '@material/tab-bar/dist/mdc.tab-bar.css',
        '@material/tab/dist/mdc.tab.css',
        '@material/tab-scroller/dist/mdc.tab-scroller.css',
        '@material/tab-indicator/dist/mdc.tab-indicator.css'
      ]}
      docsLink="https://material.io/develop/web/components/tabs/tab-bar/"
      examples={examples}
    >
      <DocsSubtitle>Basic Usage</DocsSubtitle>
      <DocsP>
        Tabs can be either controlled or uncontrolled just like inputs. Use the
        `activeTabIndex` and `onActivate` callback for controlled components.
      </DocsP>

      <DocsExample label="Uncontrolled">
        <TabBar>
          <Tab>Cookies</Tab>
          <Tab>Pizza</Tab>
          <Tab>Icecream</Tab>
        </TabBar>
      </DocsExample>

      <DocsExample label="Controlled">
        {function Example() {
          const [activeTab, setActiveTab] = React.useState(0);

          return (
            <TabBar
              activeTabIndex={activeTab}
              onActivate={evt => setActiveTab(evt.detail.index)}
            >
              <Tab>Cookies</Tab>
              <Tab>Pizza</Tab>
              <Tab>Icecream</Tab>
            </TabBar>
          );
        }}
      </DocsExample>

      <DocsSubtitle>Variants</DocsSubtitle>
      <DocsExample label="Basic">
        <TabBar>
          <Tab>Cookies</Tab>
          <Tab>Pizza</Tab>
          <Tab>Icecream</Tab>
        </TabBar>
      </DocsExample>

      <DocsExample label="With Icons">
        <TabBar>
          <Tab icon="star_border" label="Cookies" />
          <Tab icon="favorite_border" label="Pizza" />
          <Tab icon="mood" label="Icecream" />
        </TabBar>
      </DocsExample>

      <DocsExample label="Icons Only">
        <TabBar>
          <Tab icon="star_border" />
          <Tab icon="favorite_border" />
          <Tab icon="mood" />
        </TabBar>
      </DocsExample>

      <DocsExample label="Stacked">
        <TabBar>
          <Tab stacked icon="star_border" label="Cookies" />
          <Tab stacked icon="favorite_border" label="Pizza" />
          <Tab stacked icon="mood" label="Icecream" />
        </TabBar>
      </DocsExample>

      <DocsExample label="Restricted Indicator">
        <TabBar>
          <Tab stacked restrictIndicator icon="star_border" label="Cookies" />
          <Tab stacked restrictIndicator icon="favorite_border" label="Pizza" />
          <Tab stacked restrictIndicator icon="mood" label="Icecream" />
        </TabBar>
      </DocsExample>

      <DocsExample label="Scrollable">
        <TabBar>
          {/* Tabs automatically scroll with lots of content. */}
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
      </DocsExample>

      <DocProps src={propsSrc} components={['TabBar', 'Tab']} />
    </Docs>
  );
}
