# Chips

> Chips represent complex entities in small blocks, such as a contact.

import from **rmwc/Chip**  
[https://material.io/components/web/catalog/chips/](https://material.io/components/web/catalog/chips/)

Please note that in MDC, the ChipSet code contains logic for selecting single and multiple chips (filter and choice chip sets). This doesn't fit well with React's uni-directional data flow. Instead it is recommended to write your own filtering and selection logic and just apply the `selected` prop to the `Chip` component directly.

```jsx render
import { Chip, ChipText, ChipIcon, ChipSet } from 'rmwc/Chip';

<ChipSet>
  <Chip selected><ChipText>Cookies</ChipText></Chip>
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

## Simplified Usage

RMWC contains a non-standard SimpleChip component that allows for an abbreviated syntax.

```jsx render
import {
  ChipSet,
  SimpleChip
} from 'rmwc/Chip';

<ChipSet>
  <SimpleChip
    checkmark
    selected
    trailingIcon="close"
    text="Cookie Monster"
  />

  <SimpleChip
    leadingIcon="face"
    trailingIcon="close"
    text="Pizza Monster"
  />

  <SimpleChip
    leadingIcon="face"
    trailingIcon="close"
    text="Icecream Monster"
  />
</ChipSet>
```

## Filtering

Reacts Unidrectional data-flow doesn't fit well with the built in chip set functionality, but creating your own is fairly straight forward.

```jsx render
import {
  Chip,
  ChipIcon,
  ChipText,
  ChipCheckmark,
  ChipSet,
  SimpleChip
} from 'rmwc/Chip';

<ChipSet filter>
  <Chip
    selected={this.state.cookies}
    onClick={() => this.setState({cookies: !this.state.cookies})}
  >
    <ChipCheckmark />
    <ChipText>Cookies</ChipText>
    <ChipIcon tabIndex={0} use="close" trailing />
  </Chip>
  <Chip
    selected={this.state.pizza}
    onClick={() => this.setState({pizza: !this.state.pizza})}
  >
    <ChipIcon use="local_pizza" leading />
    <ChipCheckmark />
    <ChipText>Pizza</ChipText>
    <ChipIcon use="close" trailing />
  </Chip>
  {/* You can use simple chips as well */}
  <SimpleChip
    selected={this.state.icecream}
    onClick={() => this.setState({icecream: !this.state.icecream})}
    checkmark
    leadingIcon="favorite_border"
    trailingIcon="close"
    text="Icecream"
  />
</ChipSet>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="Chip" />
<DocumentComponent displayName="ChipText" />
<DocumentComponent displayName="ChipIcon" />
<DocumentComponent displayName="ChipCheckmark" />
<DocumentComponent displayName="ChipSet" />
<DocumentComponent displayName="SimpleChip" />
```
