import React from 'react';
import { render } from '@testing-library/react';
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
    const { asFragment } = render(
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
    expect(asFragment()).toMatchSnapshot();
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
      const { container } = render(
        <Component className={'my-custom-classname'} />
      );
      expect(container.firstChild).toHaveClass('my-custom-classname');
    });
  });
});
