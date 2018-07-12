# Cards

> A card is a sheet of material that serves as an entry point to more detailed information.

`material-web-components` provides a light framework for structuring cards, but the actual content layout will require a bit of custom CSS.

import from **rmwc/Card**  
[https://material.io/components/web/catalog/cards/](https://material.io/components/web/catalog/cards/)

## Fully Featured Example

```jsx render
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardAction,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from 'rmwc/Card';

import { Typography } from 'rmwc/Typography';
<Card style={{ width: '21rem' }}>
  <CardPrimaryAction>
    <CardMedia
      sixteenByNine
      style={{
        backgroundImage:
          'url(https://material-components-web.appspot.com/images/16-9.jpg)'
      }}
    />
    <div style={{ padding: '0 1rem 1rem 1rem' }}>
      <Typography use="headline6" tag="h2">
        Our Changing Planet
      </Typography>
      <Typography
        use="subtitle2"
        tag="h3"
        theme="text-secondary-on-background"
        style={{ marginTop: '-1rem' }}
      >
        by Kurt Wagner
      </Typography>
      <Typography use="body1" tag="div" theme="text-secondary-on-background">
        Visit ten places on our planet that are undergoing the biggest changes
        today.
      </Typography>
    </div>
  </CardPrimaryAction>
  <CardActions>
    <CardActionButtons>
      <CardAction>Read</CardAction>
      <CardAction>Bookmark</CardAction>
    </CardActionButtons>
    <CardActionIcons>
      <CardAction
        onLabel="Remove from favorites"
        onContent="favorite"
        offLabel="Add to favorites"
        offContent="favorite_border"
      />
      <CardAction use="share" />
      <CardAction use="more_vert" />
    </CardActionIcons>
  </CardActions>
</Card>
```

## Article Preview Example

```jsx render
import { Card, CardPrimaryAction, CardAction, CardActions } from 'rmwc/Card';
import { ListDivider } from 'rmwc/List';
import { Icon } from 'rmwc/Icon';
import { Typography } from 'rmwc/Typography';
<Card outlined style={{ width: '21rem' }}>
  <Typography
    use="subtitle1"
    tag="div"
    style={{ padding: '0.5rem 1rem' }}
    theme="text-secondary-on-background"
  >
    Headlines
  </Typography>

  <ListDivider />

  <CardPrimaryAction>
    <div style={{ padding: '1rem' }}>
      <Typography use="headline5" tag="div">
        Copper on the rise
      </Typography>
      <Typography use="body1" tag="p" theme="text-secondary-on-background">
        Copper price soars amid global market optimism and increased demand.
      </Typography>
    </div>
  </CardPrimaryAction>

  <ListDivider />

  <CardPrimaryAction>
    <div style={{ padding: '1rem' }}>
      <Typography use="headline5" tag="div">
        U.S. tech startups rebound
      </Typography>
      <Typography use="body1" tag="p" theme="text-secondary-on-background">
        Favorable business conditions have allowed startups to secure more
        fundraising deals compared to last year.
      </Typography>
    </div>
  </CardPrimaryAction>

  <ListDivider />

  <CardPrimaryAction>
    <div style={{ padding: '1rem' }}>
      <Typography use="headline5" tag="div">
        Asia's clean energy ambitions
      </Typography>
      <Typography use="body1" tag="p" theme="text-secondary-on-background">
        China plans to invest billions of dollars for the development of over
        300 clean energy projects in Southeast Asia.
      </Typography>
    </div>
  </CardPrimaryAction>

  <ListDivider />

  <CardActions fullBleed>
    <CardAction>
      All Business Headlines <Icon use="arrow_forward" />
    </CardAction>
  </CardActions>
</Card>
```

## Mini Card Example

```jsx render
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardMediaContent,
  CardAction,
  CardActionIcons,
  CardActions
} from 'rmwc/Card';
<Card style={{ width: '12.5rem' }}>
  <CardPrimaryAction>
    <CardMedia
      square
      style={{
        backgroundImage:
          'url(https://material-components-web.appspot.com/images/1-1.jpg)'
      }}
    >
      <CardMediaContent>
        <Typography
          use="subheading2"
          tag="div"
          theme="text-primary-on-dark"
          style={{
            padding: '0.5rem 1rem',
            backgroundImage:
              'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',
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
  </CardPrimaryAction>
  <CardActions>
    <CardActionIcons>
      <CardAction
        onLabel="Remove from favorites"
        onContent="favorite"
        offLabel="Add to favorites"
        offContent="favorite_border"
      />
      <CardAction use="bookmark_border" />
      <CardAction use="share" />
    </CardActionIcons>
  </CardActions>
</Card>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="Card" />
<DocumentComponent displayName="CardPrimaryAction" />
<DocumentComponent displayName="CardMedia" />
<DocumentComponent displayName="CardMediaContent" />
<DocumentComponent displayName="CardActions" />
<DocumentComponent displayName="CardActionButtons" />
<DocumentComponent displayName="CardActionIcons" />
<DocumentComponent displayName="CardAction" />
```
