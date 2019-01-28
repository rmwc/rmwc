import RMWC from '@rmwc/types';
import * as React from 'react';

import { componentFactory, classNames } from '@rmwc/base';
import { withRipple } from '@rmwc/ripple';
import { Icon, IconProps, IconPropT } from '@rmwc/icon';

export interface ListItemProps extends RMWC.WithRippleProps {
  /** A modifier for a selected state. */
  selected?: boolean;
  /** A modifier for an active state. */
  activated?: boolean;
  /** A modifier for a disabled state. */
  disabled?: boolean;
}

/**
 * The ListItem component.
 */
export const ListItem = withRipple({ surface: false })(
  componentFactory<ListItemProps>({
    displayName: 'ListItem',
    defaultProps: {
      tabIndex: 0
    },
    classNames: (props: ListItemProps) => [
      'mdc-list-item',
      {
        'mdc-list-item--selected': props.selected,
        'mdc-list-item--activated': props.activated,
        'mdc-list-item--disabled': props.disabled
      }
    ],
    consumeProps: ['selected', 'activated', 'disabled', 'options'] //options is from the select element
  })
);

/** Text Wrapper for the ListItem */
export const ListItemText = componentFactory<{}>({
  displayName: 'ListItemText',
  tag: 'span',
  classNames: ['mdc-list-item__text']
});

/** Primary Text for the ListItem */
export const ListItemPrimaryText = componentFactory<{}>({
  displayName: 'ListItemPrimaryText',
  tag: 'span',
  classNames: ['mdc-list-item__primary-text']
});

/** Secondary text for the ListItem */
export const ListItemSecondaryText = componentFactory<{}>({
  displayName: 'ListItemSecondaryText',
  tag: 'span',
  classNames: ['mdc-list-item__secondary-text']
});

export interface ListItemGraphicProps extends IconProps {}

/** A graphic / icon for the ListItem */
export const ListItemGraphic = componentFactory<ListItemGraphicProps>({
  displayName: 'ListItemGraphic',
  classNames: ['mdc-list-item__graphic'],
  tag: Icon
});

export interface ListItemMetaProps extends IconProps {}

/** Meta content for the ListItem. This can either by an icon by setting the `icon` prop, or any other kind of content. */
export const ListItemMeta = componentFactory<ListItemMetaProps>({
  displayName: 'ListItemMeta',
  classNames: ['mdc-list-item__meta'],
  tag: 'div',
  render: (props, ref, Tag) => {
    if (!!props.icon) {
      return <Icon ref={ref} {...props} />;
    }

    if (React.isValidElement(props.children)) {
      const { children, ...rest } = props;
      return React.cloneElement(props.children, {
        ...rest,
        ...props.children.props,
        className: classNames(props.className, props.children.props.className)
      });
    }

    return <Tag ref={ref} {...props} />;
  }
});

/** A meta icon for the ListItem.*/
const ListItemMetaIcon = componentFactory<ListItemMetaProps>({
  displayName: 'ListItemMetaIcon',
  classNames: ['mdc-list-item__meta'],
  tag: Icon
});

/** A container to group ListItems */
export const ListGroup = componentFactory<{}>({
  displayName: 'ListGroup',
  classNames: ['mdc-list-group']
});

/** A subheader for the ListGroup */
export const ListGroupSubheader = componentFactory<{}>({
  displayName: 'ListGroupSubheader',
  classNames: ['mdc-list-group__subheader']
});

/** A divider for the List */
export const ListDivider = componentFactory<{}>({
  displayName: 'ListDivider',
  classNames: ['mdc-list-divider']
});

export interface SimpleListItemProps extends ListItemProps {
  /** Text for the ListItem. */
  text?: React.ReactNode;
  /** Secondary Text for the ListItem. */
  secondaryText?: React.ReactNode;
  /** A graphic icon for the ListItem. */
  graphic?: IconPropT;
  /** A meta icon for the ListItem */
  metaIcon?: IconPropT;
  /** Meta content for the ListItem instead of an icon. */
  meta?: React.ReactNode;
  /** Children to render */
  children?: React.ReactNode;
}

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
