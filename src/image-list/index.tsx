import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { Tag, useClassNames } from '@rmwc/base';

/** The root of the Image List. */
export interface ImageListProps {
  /** Indicates that this Image List should use the Masonry variant. */
  masonry?: boolean;
  /** Indicates that supporting content should be positioned in a scrim overlaying each image (instead of positioned separately under each image). */
  withTextProtection?: boolean;
}

/** The root of the Image List. */
export const ImageList = React.forwardRef<
  any,
  ImageListProps & RMWC.ComponentProps
>(function ImageList(props, ref) {
  const { masonry, withTextProtection, ...rest } = props;
  const className = useClassNames(props, [
    'mdc-image-list',
    {
      'mdc-image-list--masonry': masonry,
      'mdc-image-list--with-text-protection': withTextProtection
    }
  ]);
  return <Tag tag="ul" ref={ref} {...rest} className={className} />;
});
ImageList.displayName = 'ImageList';

/** Indicates each item in an Image List. */
export interface ImageListItemProps {}

/** Indicates each item in an Image List. */
export const ImageListItem = React.forwardRef<
  any,
  ImageListItemProps & RMWC.ComponentProps
>(function ImageListItem(props, ref) {
  const className = useClassNames(props, ['mdc-image-list__item']);
  return <Tag tag="li" ref={ref} {...props} className={className} />;
});
ImageListItem.displayName = 'ImageListItem';

/** Optional. Parent of each item’s image element, responsible for constraining aspect ratio. This element may be omitted entirely if images are already sized to the correct aspect ratio. */
export interface ImageListImageAspectContainerProps {}

/** Optional. Parent of each item’s image element, responsible for constraining aspect ratio. This element may be omitted entirely if images are already sized to the correct aspect ratio. */
export const ImageListImageAspectContainer = React.forwardRef<
  any,
  ImageListImageAspectContainerProps & RMWC.ComponentProps
>(function ImageListImageAspectContainer(props, ref) {
  const className = useClassNames(props, [
    'mdc-image-list__image-aspect-container'
  ]);
  return <Tag ref={ref} {...props} className={className} />;
});
ImageListImageAspectContainer.displayName = 'ImageListImageAspectContainer';

/** Indicates the image element in each item. */
export interface ImageListImageProps {}

/** Indicates the image element in each item. */
export const ImageListImage = React.forwardRef<
  any,
  ImageListImageProps & RMWC.ComponentProps
>(function ImageListImage(props, ref) {
  const className = useClassNames(props, ['mdc-image-list__image']);
  return <Tag tag="img" ref={ref} {...props} className={className} />;
});
ImageListImage.displayName = 'ImageListImage';

/** Optional. Indicates the area within each item containing the supporting text label, if the Image List contains text labels. */
export interface ImageListSupportingProps {}

/** Optional. Indicates the area within each item containing the supporting text label, if the Image List contains text labels. */
export const ImageListSupporting = React.forwardRef<
  any,
  ImageListSupportingProps & RMWC.ComponentProps
>(function ImageListSupporting(props, ref) {
  const className = useClassNames(props, ['mdc-image-list__supporting']);
  return <Tag ref={ref} {...props} className={className} />;
});
ImageListSupporting.displayName = 'ImageListSupporting';

/** Optional. Indicates the text label in each item, if the Image List contains text labels. */
export interface ImageListLabelProps {}

/** Optional. Indicates the text label in each item, if the Image List contains text labels. */
export const ImageListLabel = React.forwardRef<
  any,
  ImageListLabelProps & RMWC.ComponentProps
>(function ImageListLabel(props, ref) {
  const className = useClassNames(props, ['mdc-image-list__label']);
  return <Tag ref={ref} {...props} className={className} />;
});
ImageListLabel.displayName = 'ImageListLabel';
