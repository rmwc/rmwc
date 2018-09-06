import * as React from 'react';

import { storiesOf } from '@storybook/react';
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardMediaContent,
  CardActions,
  CardActionButtons,
  CardActionIcons,
  CardAction
} from './';

import { Typography } from '@rmwc/typography';
import { ListDivider } from '@rmwc/list';
import { Icon } from '@rmwc/icon';

storiesOf('Cards', module)
  .add('Full Featured', () => (
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
          <Typography use="title" tag="h2">
            Our Changing Planet
          </Typography>
          <Typography
            use="subheading1"
            tag="h3"
            theme="text-secondary-on-background"
            style={{ marginTop: '-1rem' }}
          >
            by Kurt Wagner
          </Typography>
          <Typography
            use="body1"
            tag="div"
            theme="text-secondary-on-background"
          >
            Visit ten places on our planet that are undergoing the biggest
            changes today.
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
            iconToggle
            on={{ label: 'Remove from favorites', content: 'favorite' }}
            off={{ label: 'Add to favorites', content: 'favorite_border' }}
          />
          <CardAction icon="share" />
          <CardAction icon="more_vert" />
        </CardActionIcons>
      </CardActions>
    </Card>
  ))
  .add('Article', () => (
    <Card outlined style={{ width: '21rem' }}>
      <Typography
        use="subheading2"
        tag="div"
        style={{ padding: '0.5rem 1rem' }}
        theme="text-secondary-on-background"
      >
        Headlines
      </Typography>

      <ListDivider />

      <CardPrimaryAction>
        <div style={{ padding: '1rem' }}>
          <Typography use="headline" tag="div">
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
          <Typography use="headline" tag="div">
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
          <Typography use="headline" tag="div">
            Asia's clean energy ambitions
          </Typography>
          <Typography use="body1" tag="p" theme="text-secondary-on-background">
            China plans to invest billions of dollars for the development of
            over 300 clean energy projects in Southeast Asia.
          </Typography>
        </div>
      </CardPrimaryAction>

      <ListDivider />

      <CardActions fullBleed>
        <CardAction>
          All Business Headlines <Icon icon="arrow_forward" />
        </CardAction>
      </CardActions>
    </Card>
  ))
  .add('Mini', () => (
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
            iconToggle
            on={{ label: 'Remove from favorites', content: 'favorite' }}
            off={{ label: 'Add to favorites', content: 'favorite_border' }}
          />
          <CardAction icon="bookmark_border" />
          <CardAction icon="share" />
        </CardActionIcons>
      </CardActions>
    </Card>
  ));
