import React from 'react';

import { storiesOf } from '@storybook/react';
// import { linkTo } from '@storybook/addon-links';
// import { Welcome } from '@storybook/react/demo';
import { boolean } from '@storybook/addon-knobs';
import {
  Card,
  CardHorizontalBlock,
  CardMedia,
  CardMediaItem,
  CardPrimary,
  CardTitle,
  CardSubtitle,
  CardSupportingText,
  CardActions,
  CardAction
} from './';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Cards', module).add('Card', () => (
  <div>
    <Card style={{ width: '320px' }} themeDark={boolean('themeDark', false)}>
      <CardMedia
        style={{
          backgroundImage:
            'url(https://material-components-web.appspot.com/images/16-9.jpg)',
          height: '12.313rem'
        }}
      />
      <CardPrimary>
        <CardTitle large>Card Title</CardTitle>
        <CardSubtitle>Subtitle here</CardSubtitle>
      </CardPrimary>
      <CardSupportingText />
      <CardActions>
        <CardAction>Action 1</CardAction>
        <CardAction>Action 2</CardAction>
      </CardActions>
    </Card>

    <Card style={{ width: '320px' }}>
      <CardHorizontalBlock>
        <CardPrimary>
          <CardTitle large>Title Here</CardTitle>
          <CardSubtitle>Subtitle Here</CardSubtitle>
        </CardPrimary>
        <CardMediaItem src="https://material-components-web.appspot.com/images/1-1.jpg" />
      </CardHorizontalBlock>
      <CardActions>
        <CardAction>Action 1</CardAction>
        <CardAction>Action 2</CardAction>
      </CardActions>
    </Card>
  </div>
));
