# Shape

> Shapes direct attention, identify components, communicate state, and express brand.

import from **rmwc/Shape**  
[https://material.io/components/web/catalog/shape/](https://material.io/components/web/catalog/shape/)

```jsx render
import { ShapeContainer } from 'rmwc/Shape';
import { Button } from 'rmwc/Button';
import { Card, CardPrimaryAction, CardMedia } from 'rmwc/Card';

<ShapeContainer corner="10" backgroundColor="#f2f2f2">
  <Button unelevated>Button</Button>
</ShapeContainer>

<ShapeContainer corner="5" backgroundColor="#f2f2f2">
  <Button unelevated>Button</Button>
</ShapeContainer>

<ShapeContainer
  topLeftCorner="10"
  bottomRightCorner="10"
  outlineWidth="2"
  outlineColor="var(--mdc-theme-primary)"
  backgroundColor="#f2f2f2"
>
  <Button outlined>Button</Button>
</ShapeContainer>

<ShapeContainer
  topLeftCorner="30"
  bottomRightCorner="30"
  outlineWidth="1"
  outlineColor="#e0e0e0"
  backgroundColor="#f2f2f2"
>
  <Card outlined>
    <CardPrimaryAction>
      <div style={{display: 'flex'}}>
      <CardMedia square style={{
        width: '110px',
        backgroundImage: 'url(https://material-components-web.appspot.com/images/1-1.jpg)'
        }}
      />
        <div style={{padding: '20px'}}>
          Card
        </div>
      </div>
    </CardPrimaryAction>
  </Card>
</ShapeContainer>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="ShapeContainer" />
```
