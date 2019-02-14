# Typography

> Material Design’s text sizes and styles were developed to balance content density and reading comfort under typical usage conditions.

- Module **@rmwc/typography**  
- Import styles:
  - import **'@material/typography/dist/mdc.typography.css'**;
- MDC Docs: [https://material.io/develop/web/components/typography/](https://material.io/develop/web/components/typography/)

```jsx render
import { Typography } from '@rmwc/typography';

<Typography use="headline1">headline1</Typography>
<Typography use="headline2">headline2</Typography>
<Typography use="headline3">headline3</Typography>
<Typography use="headline4">headline4</Typography>
<Typography use="headline5">headline5</Typography>
<Typography use="headline6">headline6</Typography>
<Typography use="subtitle1">subtitle1</Typography>
<Typography use="subtitle2">subtitle2</Typography>
<Typography use="body1">body1</Typography>
<Typography use="body2">body2</Typography>
<Typography use="caption">caption</Typography>
<Typography use="button">button</Typography>
<Typography use="overline">overline</Typography>
```

```jsx renderOnly
import { Docs } from '@rmwc/base/utils/document-component';
import * as docs from './docgen.json';

<Docs src={docs} components={['Typography']} />
```
