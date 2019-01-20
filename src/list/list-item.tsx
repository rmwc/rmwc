import * as React from 'react';

import { componentFactory, ComponentProps } from '@rmwc/base';
import { withRipple, WithRippleProps } from '@rmwc/ripple';
import { Icon, IconProps, IconPropT } from '@rmwc/icon';

export interface ListItemProps extends WithRippleProps {
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
export const ListItem = withRipple()(
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

/** A graphic / icon for the ListItem */
export const ListItemGraphic = componentFactory<IconProps>({
  displayName: 'ListItemGraphic',
  classNames: ['mdc-list-item__graphic'],
  tag: Icon
});

/** A meta icon for the ListItem. By default this is an icon component. If you need to render text, specify a tag="span" and basename="" to ensure proper rendering. See the examples above.*/
export const ListItemMeta = componentFactory<IconProps>({
  displayName: 'ListItemMeta',
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
  meta?: IconPropT;
  /** Children to render */
  children?: React.ReactNode;
}

export const SimpleListItem = ({
  text,
  secondaryText,
  graphic,
  meta,
  children,
  ...rest
}: SimpleListItemProps & ComponentProps) => {
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
      {meta !== undefined && <ListItemMeta icon={meta} />}
      {children}
    </ListItem>
  );
};

SimpleListItem.displayName = 'SimpleListItem';
