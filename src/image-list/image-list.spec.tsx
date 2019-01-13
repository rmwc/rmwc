import * as React from 'react';
import { mount } from 'enzyme';
import {
  ImageList,
  ImageListItem,
  ImageListImageAspectContainer,
  ImageListImage,
  ImageListSupporting,
  ImageListLabel
} from './';

const images = [
  'https://material-components-web.appspot.com/images/photos/3x2/1.jpg',
  'https://material-components-web.appspot.com/images/photos/2x3/1.jpg',
  'https://material-components-web.appspot.com/images/photos/3x2/4.jpg',
  'https://material-components-web.appspot.com/images/photos/3x2/5.jpg',
  'https://material-components-web.appspot.com/images/photos/3x2/6.jpg',
  'https://material-components-web.appspot.com/images/photos/2x3/2.jpg',
  'https://material-components-web.appspot.com/images/photos/3x2/8.jpg',
  'https://material-components-web.appspot.com/images/photos/3x2/11.jpg',
  'https://material-components-web.appspot.com/images/photos/2x3/5.jpg',
  'https://material-components-web.appspot.com/images/photos/3x2/13.jpg',
  'https://material-components-web.appspot.com/images/photos/3x2/14.jpg',
  'https://material-components-web.appspot.com/images/photos/2x3/6.jpg',
  'https://material-components-web.appspot.com/images/photos/3x2/15.jpg',
  'https://material-components-web.appspot.com/images/photos/3x2/16.jpg',
  'https://material-components-web.appspot.com/images/photos/2x3/7.jpg'
];

describe('ImageList', () => {
  test('renders', () => {
    mount(
      <ImageList>
        {images.map(src => (
          <ImageListItem
            key={src}
            style={{ margin: '2px', width: 'calc(100% / 5 - 4.2px)' }}
          >
            <ImageListImageAspectContainer
              style={{ paddingBottom: 'calc(100% / 1.5)' }}
            >
              <ImageListImage src={src} />
            </ImageListImageAspectContainer>
            <ImageListSupporting>
              <ImageListLabel>Text label</ImageListLabel>
            </ImageListSupporting>
          </ImageListItem>
        ))}
      </ImageList>
    );
  });

  test('masonry prop', () => {
    const el = mount(<ImageList masonry />);
    expect(el.html().includes('mdc-image-list--masonry')).toBe(true);
  });

  test('masonry withTextProtection', () => {
    const el = mount(<ImageList withTextProtection />);
    expect(el.html().includes('mdc-image-list--with-text-protection')).toBe(
      true
    );
  });
});
