import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { componentFactory } from '@rmwc/base';

/** The root of the Image List. */
export interface ImageListProps {
  /** Indicates that this Image List should use the Masonry variant. */
  masonry?: boolean;
  /** Indicates that supporting content should be positioned in a scrim overlaying each image (instead of positioned separately under each image). */
  withTextProtection?: boolean;
}

/** The root of the Image List. */
export const ImageList = componentFactory<ImageListProps>({
  displayName: 'ImageList',
  tag: 'ul',
  classNames: (props: ImageListProps) => [
    'mdc-image-list',
    {
      'mdc-image-list--masonry': props.masonry,
      'mdc-image-list--with-text-protection': props.withTextProtection
    }
  ],
  consumeProps: ['masonry', 'withTextProtection']
});

/** Indicates each item in an Image List. */
export interface ImageListItemProps {}

/** Indicates each item in an Image List. */
export const ImageListItem = componentFactory<ImageListItemProps>({
  displayName: 'ImageListItem',
  tag: 'li',
  classNames: ['mdc-image-list__item']
});

/** Optional. Parent of each item’s image element, responsible for constraining aspect ratio. This element may be omitted entirely if images are already sized to the correct aspect ratio. */
export interface ImageListImageAspectContainerProps {}

/** Optional. Parent of each item’s image element, responsible for constraining aspect ratio. This element may be omitted entirely if images are already sized to the correct aspect ratio. */
export const ImageListImageAspectContainer = componentFactory<
  ImageListImageAspectContainerProps
>({
  displayName: 'ImageListImageAspectContainer',
  classNames: ['mdc-image-list__image-aspect-container']
});

/** Indicates the image element in each item. */
export interface ImageListImageProps {}

/** Indicates the image element in each item. */
export const ImageListImage = componentFactory<ImageListImageProps>({
  displayName: 'ImageListImage',
  tag: 'img',
  classNames: ['mdc-image-list__image']
});

/** Optional. Indicates the area within each item containing the supporting text label, if the Image List contains text labels. */
export interface ImageListSupportingProps {}

/** Optional. Indicates the area within each item containing the supporting text label, if the Image List contains text labels. */
export const ImageListSupporting = componentFactory<ImageListSupportingProps>({
  displayName: 'ImageListSupporting',
  classNames: ['mdc-image-list__supporting']
});

/** Optional. Indicates the text label in each item, if the Image List contains text labels. */
export interface ImageListLabelProps {}

/** Optional. Indicates the text label in each item, if the Image List contains text labels. */
export const ImageListLabel = componentFactory<ImageListLabelProps>({
  displayName: 'ImageListLabel',
  classNames: ['mdc-image-list__label']
});
