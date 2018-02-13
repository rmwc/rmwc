# Cards

> A card is a sheet of material that serves as an entry point to more detailed information.

`material-web-components` provides a light framework for structuring cards, but the actual content layout will require a bit of custom CSS.

import from **rmwc/Card**  
[https://material.io/components/web/catalog/cards/](https://material.io/components/web/catalog/cards/)

## Fully Featured Example

```jsx render
import {
  Card,
  CardMedia,
  CardAction,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from 'rmwc/Card';

import { Typography } from 'rmwc/Typography';

<Card style={{width: '21rem'}}>
  <CardMedia sixteenByNine style={{backgroundImage: 'url(https://material-components-web.appspot.com/images/16-9.jpg)'}}/>
  <div style={{padding: '0 1rem 1rem 1rem'}}>
    <Typography use="title" tag="h2">Our Changing Planet</Typography>
    <Typography
      use="subheading1"
      tag="h3"
      theme="text-secondary-on-background"
      style={{marginTop: '-1rem'}}
    >
      by Kurt Wagner
    </Typography>
    <Typography use="body1" tag="div" theme="text-secondary-on-background">Visit ten places on our planet that are undergoing the biggest changes today.</Typography>
  </div>
  <CardActions>
    <CardActionButtons>
      <CardAction>Read</CardAction>
      <CardAction>Bookmark</CardAction>
    </CardActionButtons>
    <CardActionIcons>
      <CardAction
        iconToggle
        on={{label: 'Remove from favorites', content: 'favorite'}}
        off={{label: 'Add to favorites', content: 'favorite_border'}}
      />
      <CardAction icon use="share" />
      <CardAction icon use="more_vert" />
    </CardActionIcons>
  </CardActions>
</Card>
```

## Article Preview Example

```jsx render
import {
  Card,
  CardAction,
  CardActions
} from 'rmwc/Card';

import {
  ListDivider,
} from 'rmwc/List';

import {
  Icon,
} from 'rmwc/Icon';

import { Typography } from 'rmwc/Typography';

<Card stroked style={{width: '21rem'}}>
  <Typography
    use="subheading2"
    tag="div"
    style={{padding: '0.5rem 1rem'}}
    theme="text-secondary-on-background"
  >
    Headlines
  </Typography>

  <ListDivider />

  <div style={{padding: '1rem'}}>
    <Typography use="headline" tag="div">Copper on the rise</Typography>
    <Typography
      use="body1"
      tag="p"
      theme="text-secondary-on-background"
    >
    Copper price soars amid global market optimism and increased demand.</Typography>
  </div>

  <ListDivider />

  <div style={{padding: '1rem'}}>
    <Typography use="headline" tag="div">U.S. tech startups rebound</Typography>
    <Typography
      use="body1"
      tag="p"
      theme="text-secondary-on-background"
    >
      Favorable business conditions have allowed startups to secure more fundraising deals compared to last year.
    </Typography>
  </div>

  <ListDivider />

  <div style={{padding: '1rem'}}>
    <Typography use="headline" tag="div">Asia's clean energy ambitions</Typography>
    <Typography
      use="body1"
      tag="p"
      theme="text-secondary-on-background"
    >
      China plans to invest billions of dollars for the development of over 300 clean energy projects in Southeast Asia.
    </Typography>
  </div>

  <ListDivider />

  <CardActions fullBleed>
    <CardAction>All Business Headlines <Icon use="arrow_forward"/></CardAction>
  </CardActions>
</Card>
```

## Mini Card Example

```jsx render
import {
  Card,
  CardMedia,
  CardMediaContent,
  CardAction,
  CardActionIcons,
  CardActions
} from 'rmwc/Card';


<Card style={{width: '12.5rem'}}>
  <CardMedia square style={{backgroundImage: 'url(https://material-components-web.appspot.com/images/1-1.jpg)'}}>
    <CardMediaContent>
      <Typography
        use="subheading2"
        tag="div"
        theme="text-primary-on-dark"
        style={{
          padding: '0.5rem 1rem',
          backgroundImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',
          bottom: '0',
          left: '0',
          right: '0',
          position: 'absolute'
        }}
      >
        Vacation Photos
      </Typography>
    </CardMediaContent>
  </CardMedia>
  <CardActions>
    <CardActionIcons>
      <CardAction
        iconToggle
        on={{label: 'Remove from favorites', content: 'favorite'}}
        off={{label: 'Add to favorites', content: 'favorite_border'}}
      />
      <CardAction icon use="bookmark_border"/>
      <CardAction icon use="share"/>
    </CardActionIcons>
  </CardActions>
</Card>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/DocumentComponent';

<DocumentComponent displayName="Card" />
<DocumentComponent displayName="CardMedia" />
<DocumentComponent displayName="CardMediaContent" />
<DocumentComponent displayName="CardActions" />
<DocumentComponent displayName="CardActionButtons" />
<DocumentComponent displayName="CardActionIcons" />
<DocumentComponent displayName="CardAction" />
```
