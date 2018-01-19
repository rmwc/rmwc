# Cards

> A card is a sheet of material that serves as an entry point to more detailed information.

Material Card layouts can be very complex and there isn't a one size fits all solution. The structures below were copied from the [material-components-web card demo page](https://material-components-web.appspot.com/card.html).

import from **rmwc/Card**  
[https://material.io/components/web/catalog/cards/](https://material.io/components/web/catalog/cards/)

```jsx render
import {
  Card,
  CardMedia,
  CardMediaItem,
  CardPrimary,
  CardTitle,
  CardSubtitle,
  CardSupportingText,
  CardActions,
  CardAction,
  CardHorizontalBlock
} from 'rmwc/Card';

{/** 1 */}
<Card>
  <CardMedia style={{
    backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)',
    backgroundSize: 'cover',
    height: '12.313rem'
  }}>
  </CardMedia>
  <CardSupportingText>
    (1) Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.
  </CardSupportingText>
</Card>

{/** 2 */}
<Card>
  <CardPrimary>
    <CardTitle>(2) Title</CardTitle>
    <CardSubtitle>Subhead</CardSubtitle>
  </CardPrimary>
  <CardMedia style={{
    backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)',
    backgroundSize: 'cover',
    height: '12.313rem'
  }}>
  </CardMedia>
  <CardSupportingText>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.
  </CardSupportingText>
  <CardActions>
    <CardAction>Action 1</CardAction>
    <CardAction>Action 2</CardAction>
  </CardActions>
</Card>


{/** 3 */}
<Card>
  <CardPrimary>
    <CardTitle>(3) Title</CardTitle>
    <CardSubtitle>Subhead</CardSubtitle>
  </CardPrimary>
  <CardMedia style={{
    backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)',
    backgroundSize: 'cover',
    height: '12.313rem'
  }}>
  </CardMedia>
  <CardActions vertical>
    <CardAction>Action 1</CardAction>
    <CardAction>Action 2</CardAction>
  </CardActions>
</Card>

{/** 4 */}
<Card>
  <CardMedia style={{
    backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)',
    backgroundSize: 'cover',
    height: '12.313rem'
  }}>
  </CardMedia>
  <CardPrimary>
    <CardTitle large>(4) Card Title</CardTitle>
    <CardSubtitle>Subtitle here</CardSubtitle>
  </CardPrimary>
  <CardSupportingText>
  </CardSupportingText>
  <CardActions>
    <CardAction>Action 1</CardAction>
    <CardAction>Action 2</CardAction>
  </CardActions>
</Card>

{/** 5 */}
<Card>
  <CardPrimary>
    <CardTitle large>(5) Card Title</CardTitle>
    <CardSubtitle>Subtitle here</CardSubtitle>
  </CardPrimary>
  <CardSupportingText>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat.
  </CardSupportingText>
  <CardActions>
    <CardAction>Action 1</CardAction>
    <CardAction>Action 2</CardAction>
  </CardActions>
</Card>

{/** 6 */}
<Card themeDark style={{
    backgroundImage: 'url(https://material-components-web.appspot.com/images/1-1.jpg)',
    backgroundSize: 'cover',
    height: '21.875rem'
  }}>
  <CardPrimary>
    <CardTitle large>(6) Card Title</CardTitle>
    <CardSubtitle>Subtitle here</CardSubtitle>
  </CardPrimary>
  <CardSupportingText>
  </CardSupportingText>
  <CardActions>
    <CardAction>Action 1</CardAction>
    <CardAction>Action 2</CardAction>
  </CardActions>
</Card>

{/** 7 */}
<Card themeDark>
  <CardMedia style={{
    backgroundImage: 'url(https://material-components-web.appspot.com/images/1-1.jpg)',
    backgroundSize: 'cover',
    height: '10rem'
  }}>
    <CardTitle large>(7) Card Title</CardTitle>
  </CardMedia>
  <CardActions>
    <CardAction>Action 1</CardAction>
  </CardActions>
</Card>

{/** 8 */}
<Card>
  <CardHorizontalBlock>
    <CardPrimary>
      <CardTitle large>(8) Card Title</CardTitle>
      <CardSubtitle>Subtitle here</CardSubtitle>
    </CardPrimary>
    <CardMediaItem src="https://material-components-web.appspot.com/images/1-1.jpg"/>
  </CardHorizontalBlock>
  <CardActions>
    <CardAction>Action 1</CardAction>
    <CardAction>Action 2</CardAction>
  </CardActions>
</Card>

{/** 9 */}
<Card>
  <CardHorizontalBlock>
    <CardPrimary>
      <CardTitle large>(9) Card Title</CardTitle>
      <CardSubtitle>Subtitle here</CardSubtitle>
    </CardPrimary>
    <CardMediaItem oneDotFiveX src="https://material-components-web.appspot.com/images/1-1.jpg"/>
  </CardHorizontalBlock>
  <CardActions>
    <CardAction>Action 1</CardAction>
    <CardAction>Action 2</CardAction>
  </CardActions>
</Card>

{/** 10 */}
<Card>
  <CardHorizontalBlock>
    <CardPrimary>
      <CardTitle large>(10) Card Title</CardTitle>
      <CardSubtitle>Subtitle here</CardSubtitle>
    </CardPrimary>
    <CardMediaItem twoX src="https://material-components-web.appspot.com/images/1-1.jpg"/>
  </CardHorizontalBlock>
  <CardActions>
    <CardAction>Action 1</CardAction>
    <CardAction>Action 2</CardAction>
  </CardActions>
</Card>

{/** 11 */}
<Card>
  <CardHorizontalBlock>
    <CardMediaItem threeX src="https://material-components-web.appspot.com/images/1-1.jpg"/>
    <CardActions vertical>
      <CardAction>(11)</CardAction>
      <CardAction>A2</CardAction>
    </CardActions>
  </CardHorizontalBlock>
</Card>
```

## Dark Themed Cards

Cards can be made dark by adding the `themeDark` prop, or by using the dark theme context. Remember to add a dark background to the card when using the dark theme. The following examples are subtly different but create identical results.

```jsx render
import {
  Card,
  CardMedia,
  CardMediaItem,
  CardPrimary,
  CardTitle,
  CardSubtitle,
  CardActions,
  CardAction,
  CardHorizontalBlock
} from 'rmwc/Card';

import { Theme } from 'rmwc/Theme';

{/** Using the themeDark prop */}
<Card themeDark style={{
  background: '#262626'
}}>
  <CardHorizontalBlock>
    <CardPrimary>
      <CardTitle large>themeDark Prop</CardTitle>
      <CardSubtitle>Subtitle here</CardSubtitle>
    </CardPrimary>
    <CardMediaItem src="https://material-components-web.appspot.com/images/1-1.jpg"/>
  </CardHorizontalBlock>
  <CardActions>
    <CardAction raised>Action 1</CardAction>
  </CardActions>
</Card>

{/** Using the dark theme context */}
<Theme use="dark">
  <Card style={{
    background: '#262626'
  }}>
    <CardHorizontalBlock>
      <CardPrimary>
        <CardTitle large>Dark Theme Context</CardTitle>
        <CardSubtitle>Subtitle here</CardSubtitle>
      </CardPrimary>
      <CardMediaItem src="https://material-components-web.appspot.com/images/1-1.jpg"/>
    </CardHorizontalBlock>
    <CardActions>
      <CardAction raised>Action 1</CardAction>
    </CardActions>
  </Card>
</Theme>
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
