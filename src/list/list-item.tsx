import * as RMWC from '@rmwc/types';
import * as React from 'react';

import { classNames, useClassNames, Tag } from '@rmwc/base';
import { withRipple } from '@rmwc/ripple';
import { Icon, IconProps } from '@rmwc/icon';

/** A ListItem component. */
export interface ListItemProps extends RMWC.WithRippleProps {
  /** A modifier for a selected state. */
  selected?: boolean;
  /** A modifier for an active state. */
  activated?: boolean;
  /** A modifier for a disabled state. */
  disabled?: boolean;
}

/** A ListItem component. */
export const ListItem = withRipple({ surface: false })(
  React.forwardRef(function ListItem(
    props: ListItemProps & RMWC.ComponentProps,
    ref: React.Ref<any>
  ) {
    const { selected, activated, disabled, ...rest } = props;
    const className = useClassNames(props, [
      'mdc-list-item',
      {
        'mdc-list-item--selected': props.selected,
        'mdc-list-item--activated': props.activated,
        'mdc-list-item--disabled': props.disabled
      }
    ]);
    return <Tag tabIndex={0} {...rest} className={className} ref={ref} />;
  })
);
ListItem.displayName = 'ListItem';

/** Text Wrapper for the ListItem */
export interface ListItemTextProps {}

/** Text Wrapper for the ListItem */
export const ListItemText = React.forwardRef<
  any,
  ListItemTextProps & RMWC.ComponentProps
>(function ListItemText(props, ref) {
  const className = useClassNames(props, ['mdc-list-item__text']);
  return <Tag tag="span" ref={ref} {...props} className={className} />;
});
ListItemText.displayName = 'ListItemText';

/** Primary Text for the ListItem */
export interface ListItemPrimaryTextProps {}

/** Primary Text for the ListItem */
export const ListItemPrimaryText = React.forwardRef<
  any,
  ListItemPrimaryTextProps & RMWC.ComponentProps
>(function ListItemPrimaryText(props, ref) {
  const className = useClassNames(props, ['mdc-list-item__primary-text']);
  return <Tag tag="span" ref={ref} {...props} className={className} />;
});
ListItemPrimaryText.displayName = 'ListItemPrimaryText';

/** Secondary text for the ListItem */
export interface ListItemSecondaryTextProps {}

/** Secondary text for the ListItem */
export const ListItemSecondaryText = React.forwardRef<
  any,
  ListItemSecondaryTextProps & RMWC.ComponentProps
>(function ListItemSecondaryText(props, ref) {
  const className = useClassNames(props, ['mdc-list-item__secondary-text']);
  return <Tag tag="span" ref={ref} {...props} className={className} />;
});
ListItemSecondaryText.displayName = 'ListItemSecondaryText';

/** A graphic / icon for the ListItem */
export interface ListItemGraphicProps extends IconProps {}

/** A graphic / icon for the ListItem */
export const ListItemGraphic = React.forwardRef<
  any,
  ListItemGraphicProps & RMWC.ComponentProps
>(function ListItemGraphic(props, ref) {
  const className = useClassNames(props, ['mdc-list-item__graphic']);
  return <Icon ref={ref} {...props} className={className} />;
});
ListItemGraphic.displayName = 'ListItemGraphic';

/** Meta content for the ListItem. This can either by an icon by setting the `icon` prop, or any other kind of content. */
export interface ListItemMetaProps extends IconProps {}

/** Meta content for the ListItem. This can either by an icon by setting the `icon` prop, or any other kind of content. */
export const ListItemMeta = React.forwardRef<
  any,
  ListItemMetaProps & RMWC.ComponentProps
>(function ListItemMeta(props, ref) {
  const className = useClassNames(props, ['mdc-list-item__meta']);

  if (!!props.icon) {
    return <Icon ref={ref} {...props} className={className} />;
  }

  if (React.isValidElement(props.children)) {
    const { children, ...rest } = props;
    return React.cloneElement(props.children, {
      ...rest,
      ...props.children.props,
      className: classNames(className, props.children.props.className)
    });
  }

  return <Tag ref={ref} {...props} className={className} />;
});
ListItemMeta.displayName = 'ListItemMeta';

/** A container to group ListItems */
export interface ListGroupProps {}

/** A container to group ListItems */
export const ListGroup = React.forwardRef<
  any,
  ListGroupProps & RMWC.ComponentProps
>(function ListGroup(props, ref) {
  const className = useClassNames(props, ['mdc-list-group']);
  return <Tag ref={ref} {...props} className={className} />;
});
ListGroup.displayName = 'ListGroup';

/** A subheader for the ListGroup */
export interface ListGroupSubheaderProps {}

/** A subheader for the ListGroup */
export const ListGroupSubheader = React.forwardRef<
  any,
  ListGroupSubheaderProps & RMWC.ComponentProps
>(function ListGroupSubheader(props, ref) {
  const className = useClassNames(props, ['mdc-list-group__subheader']);
  return <Tag ref={ref} {...props} className={className} />;
});
ListGroupSubheader.displayName = 'ListGroupSubheader';

/** A divider for the List */
export interface ListDividerProps {}

/** A divider for the List */
export const ListDivider = React.forwardRef<
  any,
  ListDividerProps & RMWC.ComponentProps
>(function ListDivider(props, ref) {
  const className = useClassNames(props, ['mdc-list-divider']);
  return <Tag ref={ref} {...props} className={className} />;
});
ListDivider.displayName = 'ListDivider';

/** A simple list item template. */
export interface SimpleListItemProps extends ListItemProps {
  /** Text for the ListItem. */
  text?: React.ReactNode;
  /** Secondary Text for the ListItem. */
  secondaryText?: React.ReactNode;
  /** A graphic icon for the ListItem. */
  graphic?: RMWC.IconPropT;
  /** A meta icon for the ListItem */
  metaIcon?: RMWC.IconPropT;
  /** Meta content for the ListItem instead of an icon. */
  meta?: React.ReactNode;
  /** Children to render */
  children?: React.ReactNode;
}

/** A simple list item template. */
export const SimpleListItem = ({
  text,
  secondaryText,
  graphic,
  metaIcon,
  meta,
  children,
  ...rest
}: SimpleListItemProps & RMWC.ComponentProps) => {
  const primaryTextToRender =
    text && secondaryText !== undefined ? (
      <ListItemPrimaryText>{text}</ListItemPrimaryText>
    ) : (
      text
    );

  const secondaryTextToRender =
    secondaryText !== undefined ? (
      <ListItemSecondaryText>{secondaryText}</ListItemSecondaryText>
    ) : null;

  return (
    <ListItem {...rest}>
      {graphic !== undefined && <ListItemGraphic icon={graphic} />}
      {secondaryTextToRender !== null ? (
        <ListItemText>
          {primaryTextToRender}
          {secondaryTextToRender}
        </ListItemText>
      ) : (
        primaryTextToRender
      )}
      {(!!meta || !!metaIcon) && (
        <ListItemMeta icon={metaIcon}>{meta}</ListItemMeta>
      )}

      {children}
    </ListItem>
  );
};

SimpleListItem.displayName = 'SimpleListItem';
