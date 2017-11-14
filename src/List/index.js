// @flow
import * as React from 'react';
import { simpleTag, withRipple } from '../Base';

import type { SimpleTagPropsT } from '../Base';
import type { WithRipplePropsT } from '../Base';

type ListItemPropsT = {
  /* A modifier for a selected item in Permanent Drawer. */
  permanentDrawerSelected?: boolean,
  /* A modifier for a selected item in Persistent Drawer. */
  persistentDrawerSelected?: boolean,
  /* A modifier for a selected item in Temporary Drawer. */
  temporaryDrawerSelected?: boolean
} & SimpleTagPropsT &
  WithRipplePropsT;

export const ListItem: React.ComponentType<ListItemPropsT> = withRipple(
  simpleTag({
    displayName: 'ListItemRoot',
    classNames: props => [
      'mdc-list-item',
      {
        'mdc-permanent-drawer--selected': props.permanentDrawerSelected,
        'mdc-persistent-drawer--selected': props.persistentDrawerSelected,
        'mdc-temporary-drawer--selected': props.temporaryDrawerSelected
      }
    ],
    defaultProps: {
      permanentDrawerSelected: false,
      persistentDrawerSelected: false,
      temporaryDrawerSelected: false
    },
    consumeProps: [
      'permanentDrawerSelected',
      'persistentDrawerSelected',
      'temporaryDrawerSelected'
    ]
  })
);

export const ListItemText = simpleTag({
  displayName: 'ListItemText',
  tag: 'span',
  classNames: 'mdc-list-item__text'
});

export const ListItemTextSecondary = simpleTag({
  displayName: 'ListItemTextSecondary',
  tag: 'span',
  classNames: 'mdc-list-item__text__secondary'
});

export const ListItemStartDetail = simpleTag({
  displayName: 'ListItemStartDetail',
  classNames: 'mdc-list-item__start-detail',
  defaultProps: {
    wrap: true
  }
});

export const ListItemEndDetail = simpleTag({
  displayName: 'ListItemStartDetail',
  classNames: 'mdc-list-item__end-detail',
  defaultProps: {
    wrap: true
  }
});

export const ListGroup = simpleTag({
  displayName: 'ListGroup',
  classNames: 'mdc-list-group'
});

export const ListGroupSubheader = simpleTag({
  displayName: 'ListGroupSubheader',
  classNames: 'mdc-list-group__subheader'
});

export const ListDivider = simpleTag({
  displayName: 'ListDivider',
  classNames: 'mdc-list-divider'
});

type ListPropsT = {
  /* 'Reduces the padding on List items.' */
  dense?: boolean,
  /* Gives more space for dual lined list items. */
  twoLine?: boolean,
  /* Makes the list start detail circular for avatars. */
  avatarList?: boolean
} & SimpleTagPropsT;

export const List: React.ComponentType<ListPropsT> = simpleTag({
  displayName: 'List',
  classNames: props => [
    'mdc-list',
    {
      'mdc-list--dense': props.dense,
      'mdc-list--two-line': props.twoLine,
      'mdc-list--avatar-list': props.avatarList
    }
  ],
  defaultProps: {
    dense: false,
    twoLine: false,
    avatarList: false
  },
  consumeProps: ['dense', 'twoLine', 'avatarList']
});

export default List;
