# Top App Bar

> Top App Bar acts as a container for items such as application title, navigation icon, and action items.

- import from **'@rmwc/top-app-bar'**;  
- Import styles:
  - import **'@material/top-app-bar/dist/mdc.top-app-bar.css'**;
- MDC Docs: [https://material.io/develop/web/components/top-app-bar/](https://material.io/develop/web/components/top-app-bar/)

The TopAppBar cannot be effectively demoed inline, but it is in use above in the RMWC docs. To view additional functionality, check out the [Material Components Top App Bar demo page](https://material-components-web.appspot.com/top-app-bar.html).

```jsx
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  TopAppBarActionItem,
  TopAppBarTitle
} from '@rmwc/top-app-bar';

{/* Minimum usage. material-components-web will throw an error if you do not include TopAppBarNavigationIcon. */}
<TopAppBar>
  <TopAppBarRow>
    <TopAppBarSection>
      <TopAppBarNavigationIcon icon="menu" />
    </TopAppBarSection>
  </TopAppBarRow>
</TopAppBar>

{/* Fully Featured Example */}
<TopAppBar>
  <TopAppBarRow>
    <TopAppBarSection alignStart>
      <TopAppBarNavigationIcon icon="menu" />
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
import { SimpleTopAppBar } from '@rmwc/top-app-bar';

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
import { DocumentComponent } from '@rmwc/base/utils/DocumentComponent';
import * as docs from './docgen.json';

<DocumentComponent docs={docs} displayName="TopAppBar" />
<DocumentComponent docs={docs} displayName="TopAppBarRow" />
<DocumentComponent docs={docs} displayName="TopAppBarSection" />
<DocumentComponent docs={docs} displayName="TopAppBarTitle" />
<DocumentComponent docs={docs} displayName="TopAppBarNavigationIcon" composes={['Icon']} />
<DocumentComponent docs={docs} displayName="TopAppBarActionItem" composes={['Icon']} />
<DocumentComponent docs={docs} displayName="TopAppBarFixedAdjust" />
<DocumentComponent docs={docs} displayName="SimpleTopAppBar" />
```
