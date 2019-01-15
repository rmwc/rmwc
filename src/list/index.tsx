import { ComponentProps } from '@rmwc/base';
import { WithRipplePropsT } from '@rmwc/ripple';
import { RMWCProviderOptionsT, WithProviderContext } from '@rmwc/provider';
import { IconProps } from '@rmwc/icon';

import * as React from 'react';
import { withProviderContext } from '@rmwc/provider';
import { componentFactory, classNames, PropTypes } from '@rmwc/base';
import { withRipple } from '@rmwc/ripple';
import { Icon } from '@rmwc/icon';

export type ListItemPropsT = {
  /** A modifier for a selected state. */
  selected?: boolean;
  /** A modifier for an active state. */
  activated?: boolean;
  /** A modifier for a disabled state. */
  disabled?: boolean;
  /** Enable / disable the ripple. */
  ripple?: boolean;
} & ComponentProps &
  WithRipplePropsT &
  WithProviderContext;

export const ListItemRoot = withRipple()(
  componentFactory({
    displayName: 'ListItemRoot',
    classNames: (props: ListItemPropsT) => [
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

/**
 * The ListItem component.
 */
export const ListItem = withProviderContext()(
  ({ providerContext, ...props }: ListItemPropsT) => {
    const { listItemDefaultRipple } = providerContext;
    const { ripple, ...rest } = props;
    const shouldRipple = ripple === undefined ? listItemDefaultRipple : ripple;
    return <ListItemRoot ripple={shouldRipple} {...rest} />;
  }
);

ListItem.displayName = 'ListItem';
ListItem.defaultProps = {
  ripple: true,
  tabIndex: 0
};

/** Text Wrapper for the ListItem */
export const ListItemText = componentFactory({
  displayName: 'ListItemText',
  tag: 'span',
  classNames: ['mdc-list-item__text']
});

/** Primary Text for the ListItem */
export const ListItemPrimaryText = componentFactory({
  displayName: 'ListItemPrimaryText',
  tag: 'span',
  classNames: ['mdc-list-item__primary-text']
});

/** Secondary text for the ListItem */
export const ListItemSecondaryText = componentFactory({
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
export const ListGroup = componentFactory({
  displayName: 'ListGroup',
  classNames: ['mdc-list-group']
});

/** A subheader for the ListGroup */
export const ListGroupSubheader = componentFactory({
  displayName: 'ListGroupSubheader',
  classNames: ['mdc-list-group__subheader']
});

/** A divider for the List */
export const ListDivider = componentFactory({
  displayName: 'ListDivider',
  classNames: ['mdc-list-divider']
});

export type ListPropsT = {
  /** Reduces the padding on List items. */
  dense?: boolean;
  /** Gives more space for dual lined list items. */
  twoLine?: boolean;
  /** Makes the list start detail circular for avatars. */
  avatarList?: boolean;
  /** Makes the list non interactive. In addition, you'll have to set `ripple={false}` on the individual ListItems. */
  nonInteractive?: boolean;
} & ComponentProps;

/** A List Component */
export const List = componentFactory({
  displayName: 'List',
  defaultProps: {
    dense: undefined,
    twoLine: undefined,
    avatarList: undefined,
    nonInteractive: undefined
  },
  classNames: (props: ListPropsT) => [
    'mdc-list',
    {
      'mdc-list--dense': props.dense,
      'mdc-list--two-line': props.twoLine,
      'mdc-list--avatar-list': props.avatarList,
      'mdc-list--non-interactive': props.nonInteractive
    }
  ],
  consumeProps: ['dense', 'twoLine', 'avatarList', 'nonInteractive']
});

export type SimpleListItemPropsT = {
  /** Text for the ListItem. */
  text?: React.ReactNode;
  /** Secondary Text for the ListItem. */
  secondaryText?: React.ReactNode;
  /** A graphic icon for the ListItem. */
  graphic?: React.ReactNode;
  /** A meta icon for the ListItem */
  meta?: React.ReactNode;
  /** Children to render */
  children?: React.ReactNode;
} & ListItemPropsT;

export const SimpleListItem: React.ComponentType<SimpleListItemPropsT> = ({
  text,
  secondaryText,
  graphic,
  meta,
  children,
  ...rest
}: SimpleListItemPropsT) => {
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
