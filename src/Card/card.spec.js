import React from 'react';
import { mount } from 'enzyme';
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
            <CardAction>Read</CardAction>
            <CardAction>Bookmark</CardAction>
          </CardActionButtons>
          <CardActionIcons>
            <CardAction
              iconToggle
              on={{ label: 'Remove from favorites', content: 'favorite' }}
              off={{ label: 'Add to favorites', content: 'favorite_border' }}
            />
            <CardAction icon use="share" />
            <CardAction icon use="more_vert" />
          </CardActionIcons>
        </CardActions>
      </Card>
    );
  });

  it('can have custom classes', () => {
    [
      Card,
      CardMedia,
      CardMediaContent,
      CardActionButtons,
      CardActionIcons,
      CardActions,
      CardAction,
      CardPrimaryAction
    ].forEach(Component => {
      const el = mount(<Component className={'my-custom-classname'} />);
      expect(!!~el.html().search('my-custom-classname')).toEqual(true);
    });
  });
});
