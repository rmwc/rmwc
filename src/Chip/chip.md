# Chips

> Chips represent complex entities in small blocks, such as a contact.

import from **rmwc/Chip**  
[https://material.io/components/web/catalog/chips/](https://material.io/components/web/catalog/chips/)

```jsx render
import { Chip, ChipText, ChipIcon, ChipSet } from 'rmwc/Chip';

<ChipSet>
  <Chip><ChipText>Cookies</ChipText></Chip>
  <Chip><ChipText>Pizza</ChipText></Chip>
  <Chip><ChipText>Icecream</ChipText></Chip>
</ChipSet>

{/* With Icons */}
<ChipSet>
  <Chip>
    <ChipIcon leading use="favorite" />
    <ChipText>Cookies</ChipText>
    <ChipIcon trailing use="close" />
  </Chip>
</ChipSet>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/DocumentComponent';

<DocumentComponent displayName="Chip" />
<DocumentComponent displayName="ChipText" />
<DocumentComponent displayName="ChipIcon" />
<DocumentComponent displayName="ChipSet" />
```
