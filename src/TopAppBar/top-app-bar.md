# Top App Bar

> Top App Bar acts as a container for items such as application title, navigation icon, and action items.

import from **rmwc/TopAppBar**  
[https://material.io/components/web/catalog/top-app-bar/](https://material.io/components/web/catalog/top-app-bar/)

The TopAppBar cannot be effectively demoed inline, but it is in use above in the RMWC docs. To view additional functionality, check out the [Material Components Top App Bar demo page](https://material-components-web.appspot.com/top-app-bar.html).

```jsx
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarActionItem,
  TopAppBarTitle
} from 'rmwc/TopAppBar';

{/* Minimum usage. material-components-web will throw an error if you do not include TopAppBarNavigationIcon. */}
<TopAppBar>
  <TopAppBarRow>
    <TopAppBarSection>
      <TopAppBarNavigationIcon use="menu" />
    </TopAppBarSection>
  </TopAppBarRow>
</TopAppBar>

{/* Fully Featured Example */}
<TopAppBar>
  <TopAppBarRow>
    <TopAppBarSection alignStart>
      <TopAppBarNavigationIcon use="menu" />
      <TopAppBarTitle>Title</TopAppBarTitle>
    </TopAppBarSection>
    <TopAppBarSection alignEnd>
      <TopAppBarActionItem aria-label="Download" alt="Download">
        file_download
      </TopAppBarActionItem>
      <TopAppBarActionItem
        aria-label="Print this page"
        alt="Print this page"
      >
        print
      </TopAppBarActionItem>
      <TopAppBarActionItem
        aria-label="Bookmark this page"
        alt="Bookmark this page"
      >
        bookmark
      </TopAppBarActionItem>
    </TopAppBarSection>
  </TopAppBarRow>
</TopAppBar>
```

## Simplified Usage

```jsx
import { SimpleTopAppBar } from 'rmwc/TopAppBar';

<SimpleTopAppBar
  title="test"
  navigationIcon={{ onClick: () => console.log('Navigate') }}
  actionItems={[
    { onClick: () => console.log('Do Something'), use: 'file_download' },
    { onClick: () => console.log('Do Something'), use: 'print' },
    { onClick: () => console.log('Do Something'), use: 'bookmark' }
  ]}
/>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="TopAppBar" />
<DocumentComponent displayName="TopAppBarRow" />
<DocumentComponent displayName="TopAppBarSection" />
<DocumentComponent displayName="TopAppBarTitle" />
<DocumentComponent displayName="TopAppBarNavigationIcon" />
<DocumentComponent displayName="TopAppBarActionItem" />
<DocumentComponent displayName="TopAppBarFixedAdjust" />
<DocumentComponent displayName="SimpleTopAppBar" />
```
