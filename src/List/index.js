// @flow
import type { SimpleTagPropsT } from '../Base';
import type { WithRipplePropsT } from '../Base';
import type { RMWCProviderOptionsT } from '../Provider';

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getProviderOptions } from '../Provider';
import { simpleTag, withRipple } from '../Base';
import { Icon } from '../Icon';

export type ListItemPropsT = {
  /** A modifier for a selected state. */
  selected?: boolean,
  /** A modifier for an active state. */
  activated?: boolean,
  /** Enable / disable the ripple. */
  ripple?: boolean
} & SimpleTagPropsT &
  WithRipplePropsT;

export const ListItemRoot = withRipple()(
  simpleTag({
    displayName: 'ListItemRoot',
    classNames: (props: ListItemPropsT) => [
      'mdc-list-item',
      {
        'mdc-list-item--selected': props.selected,
        'mdc-list-item--activated': props.activated
      }
    ],
    consumeProps: ['selected', 'activated', 'options'] //options is from the select element
  })
);

/**
 * The ListItem component.
 */
export class ListItem extends React.Component<ListItemPropsT> {
  static displayName = 'ListItem';

  static defaultProps = {
    ripple: true
  };

  static contextTypes = {
    RMWCOptions: PropTypes.object
  };

  componentWillMount() {
    this.providerOptions = getProviderOptions(this.context);
  }

  providerOptions: RMWCProviderOptionsT;
  context: Object;

  render() {
    const { listItemDefaultRipple } = this.providerOptions;
    const { ripple, ...rest } = this.props;
    const shouldRipple = ripple === undefined ? listItemDefaultRipple : ripple;

    return <ListItemRoot ripple={shouldRipple} {...rest} />;
  }
}

/** Text for the ListItem */
export const ListItemText = simpleTag({
  displayName: 'ListItemText',
  tag: 'span',
  classNames: 'mdc-list-item__text'
});

/** Secondary text for the ListItem */
export const ListItemSecondaryText = simpleTag({
  displayName: 'ListItemSecondaryText',
  tag: 'span',
  classNames: 'mdc-list-item__secondary-text'
});

/** A graphic / icon for the ListItem */
export const ListItemGraphic = simpleTag({
  displayName: 'ListItemGraphic',
  classNames: 'mdc-list-item__graphic',
  tag: Icon
});

/** A meta icon for the ListItem. By default this is an icon component. If you need to render text, specify a tag="span" and basename="" to ensure proper rendering. See the examples above.*/
export const ListItemMeta = simpleTag({
  displayName: 'ListItemMeta',
  classNames: 'mdc-list-item__meta',
  tag: Icon
});

/** A container to group ListItems */
export const ListGroup = simpleTag({
  displayName: 'ListGroup',
  classNames: 'mdc-list-group'
});

/** A subheader for the ListGroup */
export const ListGroupSubheader = simpleTag({
  displayName: 'ListGroupSubheader',
  classNames: 'mdc-list-group__subheader'
});

/** A divider for the List */
export const ListDivider = simpleTag({
  displayName: 'ListDivider',
  classNames: 'mdc-list-divider'
});

export type ListPropsT = {
  /** Reduces the padding on List items. */
  dense?: boolean,
  /** Gives more space for dual lined list items. */
  twoLine?: boolean,
  /** Makes the list start detail circular for avatars. */
  avatarList?: boolean,
  /** Makes the list non interactive. In addition, you'll have to set `ripple={false}` on the individual ListItems. */
  nonInteractive?: boolean
} & SimpleTagPropsT;

export class List extends simpleTag({
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
})<ListPropsT> {
  render() {
    return super.render();
  }
}

export type SimpleListItemPropsT = {
  /** Text for the ListItem. */
  text?: React.Node,
  /** Secondary Text for the ListItem. */
  secondaryText?: React.Node,
  /** A graphic icon for the ListItem. */
  graphic?: React.Node,
  /** A meta icon for the ListItem */
  meta?: React.Node,
  /** Children to render */
  children?: React.Node
};

export const SimpleListItem: React.ComponentType<SimpleListItemPropsT> = ({
  text,
  secondaryText,
  graphic,
  meta,
  children,
  ...rest
}: SimpleListItemPropsT) => (
  <ListItem {...rest}>
    {graphic !== undefined && <ListItemGraphic>{graphic}</ListItemGraphic>}
    <ListItemText>
      {text}
      {secondaryText !== undefined && (
        <ListItemSecondaryText>{secondaryText}</ListItemSecondaryText>
      )}
    </ListItemText>
    {meta !== undefined && <ListItemMeta>{meta}</ListItemMeta>}
    {children}
  </ListItem>
);

SimpleListItem.displayName = 'SimpleListItem';
