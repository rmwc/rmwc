// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as RMWC from '@rmwc/types';
import React from 'react';
import { Tag, useClassNames, createComponent } from '@rmwc/base';

/** The root of the Image List. */
export interface ImageListProps {
  /** Indicates that this Image List should use the Masonry variant. */
  masonry?: boolean;
  /** Indicates that supporting content should be positioned in a scrim overlaying each image (instead of positioned separately under each image). */
  withTextProtection?: boolean;
}

/** The root of the Image List. */
export const ImageList = createComponent<ImageListProps>(function ImageList(
  props,
  ref
) {
  const { masonry, withTextProtection, ...rest } = props;
  const className = useClassNames(props, [
    'mdc-image-list',
    {
      'mdc-image-list--masonry': masonry,
      'mdc-image-list--with-text-protection': withTextProtection
    }
  ]);
  return <Tag tag="ul" {...rest} ref={ref} className={className} />;
});

/** Indicates each item in an Image List. */
export interface ImageListItemProps {}

/** Indicates each item in an Image List. */
export const ImageListItem = createComponent<ImageListItemProps>(
  function ImageListItem(props, ref) {
    const className = useClassNames(props, ['mdc-image-list__item']);
    return <Tag tag="li" {...props} ref={ref} className={className} />;
  }
);

/** Optional. Parent of each item’s image element, responsible for constraining aspect ratio. This element may be omitted entirely if images are already sized to the correct aspect ratio. */
export interface ImageListImageAspectContainerProps {}

/** Optional. Parent of each item’s image element, responsible for constraining aspect ratio. This element may be omitted entirely if images are already sized to the correct aspect ratio. */
export const ImageListImageAspectContainer = createComponent<
  ImageListImageAspectContainerProps
>(function ImageListImageAspectContainer(props, ref) {
  const className = useClassNames(props, [
    'mdc-image-list__image-aspect-container'
  ]);
  return <Tag {...props} ref={ref} className={className} />;
});

/** Indicates the image element in each item. */
export interface ImageListImageProps {}

/** Indicates the image element in each item. */
export const ImageListImage = createComponent<ImageListImageProps>(
  function ImageListImage(props, ref) {
    const className = useClassNames(props, ['mdc-image-list__image']);
    return <Tag tag="img" {...props} ref={ref} className={className} />;
  }
);

/** Optional. Indicates the area within each item containing the supporting text label, if the Image List contains text labels. */
export interface ImageListSupportingProps {}

/** Optional. Indicates the area within each item containing the supporting text label, if the Image List contains text labels. */
export const ImageListSupporting = createComponent<ImageListSupportingProps>(
  function ImageListSupporting(props, ref) {
    const className = useClassNames(props, ['mdc-image-list__supporting']);
    return <Tag {...props} ref={ref} className={className} />;
  }
);

/** Optional. Indicates the text label in each item, if the Image List contains text labels. */
export interface ImageListLabelProps {}

/** Optional. Indicates the text label in each item, if the Image List contains text labels. */
export const ImageListLabel = createComponent<ImageListLabelProps>(
  function ImageListLabel(props, ref) {
    const className = useClassNames(props, ['mdc-image-list__label']);
    return <Tag {...props} ref={ref} className={className} />;
  }
);
