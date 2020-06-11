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
  CardActionButton,
  CardActionIcon
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
            <CardActionButton>Read</CardActionButton>
            <CardActionButton>Bookmark</CardActionButton>
            <CardActionButton>Foo</CardActionButton>
          </CardActionButtons>
          <CardActionIcons>
            <CardActionIcon icon="favorite_border" />
            <CardActionIcon onIcon="favorite" icon="favorite_border" />
            <CardActionIcon icon="share" />
            <CardActionIcon icon="more_vert" />
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
      CardActionButton,
      CardActionIcon,
      CardPrimaryAction
    ].forEach((Component: any) => {
      const el = mount(<Component className={'my-custom-classname'} />);
      expect(!!~el.html().search('my-custom-classname')).toEqual(true);
    });
  });
});
