# Cards

> A card is a sheet of material that serves as an entry point to more detailed information.

import from **rmwc/Card**  
[https://material.io/components/web/catalog/cards/](https://material.io/components/web/catalog/cards/)

```jsx render
import {
  Card,
  CardMedia,
  CardPrimary,
  CardTitle,
  CardSubtitle,
  CardSupportingText,
  CardActions,
  CardAction
} from 'rmwc/Card';

<Card style={{width: '320px'}}>
  <CardMedia style={{
    backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)',
    height: '12.313rem'
  }}>
  </CardMedia>
  <CardPrimary>
    <CardTitle large>Card Title</CardTitle>
    <CardSubtitle>Subtitle here</CardSubtitle>
  </CardPrimary>
  <CardSupportingText>
  </CardSupportingText>
  <CardActions>
    <CardAction>Action 1</CardAction>
    <CardAction>Action 2</CardAction>
  </CardActions>
</Card>
```

```jsx render
import {
  Card,
  CardHorizontalBlock,
  CardPrimary,
  CardTitle,
  CardSubtitle,
  CardMediaItem,
  CardActions,
  CardAction
} from 'rmwc/Card';

<Card style={{width: '320px'}}>
  <CardHorizontalBlock>
    <CardPrimary>
      <CardTitle large>Card Title</CardTitle>
      <CardSubtitle>Subtitle here</CardSubtitle>
    </CardPrimary>
    <CardMediaItem src="https://material-components-web.appspot.com/images/1-1.jpg"/>
  </CardHorizontalBlock>
  <CardActions>
    <CardAction>Action 1</CardAction>
    <CardAction>Action 2</CardAction>
  </CardActions>
</Card>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/DocumentComponent';

<DocumentComponent displayName="Card" />
<DocumentComponent displayName="CardHorizontalBlock" />
<DocumentComponent displayName="CardMedia" />
<DocumentComponent displayName="CardMediaItem" />
<DocumentComponent displayName="CardPrimary" />
<DocumentComponent displayName="CardTitle" />
<DocumentComponent displayName="CardSubtitle" />
<DocumentComponent displayName="CardSupportingText" />
<DocumentComponent displayName="CardActions" />
<DocumentComponent displayName="CardAction" />
```
