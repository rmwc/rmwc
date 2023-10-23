// @vitest-environment node

import { renderToString as mount } from 'react-dom/server';
import {
  Card,
  CardActionButton,
  CardActionButtons,
  CardActionIcon,
  CardActionIcons,
  CardActions,
  CardMedia,
  CardPrimaryAction
} from './card';

describe('Card', () => {
  it('renders', () => {
    mount(
      <Card style={{ width: '21rem' }}>
        <CardPrimaryAction>
          <CardMedia sixteenByNine />
          <div style={{ padding: '0 1rem 1rem 1rem' }}>
            <h2>Our Changing Planet</h2>
            <h3>by Kurt Wagner</h3>
            <div>
              Visit ten places on our planet that are undergoing the biggest
              changes today.
            </div>
          </div>
        </CardPrimaryAction>
        <CardActions>
          <CardActionButtons>
            <CardActionButton>Read</CardActionButton>
            <CardActionButton>Bookmark</CardActionButton>
          </CardActionButtons>
          <CardActionIcons>
            <CardActionIcon onIcon="favorite" icon="favorite_border" />
            <CardActionIcon icon="share" />
            <CardActionIcon icon="more_vert" />
          </CardActionIcons>
        </CardActions>
      </Card>
    );
  });
});
