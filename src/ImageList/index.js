// @flow
// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import { simpleTag } from '../Base';

type ImageListPropsT = {
  /** Indicates that this Image List should use the Masonry variant. */
  masonry?: boolean,
  /** Indicates that supporting content should be positioned in a scrim overlaying each image (instead of positioned separately under each image). */
  withTextProtection?: boolean
};

/** Indicates the root Image List element. */
export class ImageList extends simpleTag({
  displayName: 'ImageList',
  tag: 'ul',
  classNames: (props: ImageListPropsT) => [
    'mdc-image-list',
    {
      'mdc-image-list--masonry': props.masonry,
      'mdc-image-list--with-text-protection': props.withTextProtection
    }
  ],
  consumeProps: ['masonry', 'withTextProtection']
})<ImageListPropsT> {
  render() {
    return super.render();
  }
}

/** Indicates each item in an Image List. */
export const ImageListItem = simpleTag({
  displayName: 'ImageListItem',
  tag: 'li',
  classNames: 'mdc-image-list__item'
});

/** Optional. Parent of each item’s image element, responsible for constraining aspect ratio. This element may be omitted entirely if images are already sized to the correct aspect ratio. */
export const ImageListImageAspectContainer = simpleTag({
  displayName: 'ImageListImageAspectContainer',
  classNames: 'mdc-image-list__image-aspect-container'
});

/** Indicates the image element in each item. */
export const ImageListImage = simpleTag({
  displayName: 'ImageListImage',
  tag: 'img',
  classNames: 'mdc-image-list__image'
});

/** Optional. Indicates the area within each item containing the supporting text label, if the Image List contains text labels. */
export const ImageListSupporting = simpleTag({
  displayName: 'ImageListSupporting',
  classNames: 'mdc-image-list__supporting'
});

/** Optional. Indicates the text label in each item, if the Image List contains text labels. */
export const ImageListLabel = simpleTag({
  displayName: 'ImageListLabel',
  classNames: 'mdc-image-list__label'
});
