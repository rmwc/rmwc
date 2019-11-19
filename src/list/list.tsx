import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { Tag, useClassNames } from '@rmwc/base';
import { useListFoundation } from './foundation';

export type ListOnActionEventT = RMWC.CustomEventT<number>;

/** A List Component */
export interface ListProps {
  /** Reduces the padding on List items. */
  dense?: boolean;
  /** Gives more space for dual lined list items. */
  twoLine?: boolean;
  /** Makes the list start detail circular for avatars. */
  avatarList?: boolean;
  /** Makes the list non interactive. In addition, you'll have to set `ripple={false}` on the individual ListItems. */
  nonInteractive?: boolean;
  /** A callback for when a list item is interacted with. evt.detail = number */
  onAction?: (evt: ListOnActionEventT) => void;
  /** An internal api used for cross component communication */
  apiRef?: (api: ListApi) => void;
}

export interface ListApi {
  listElements: () => HTMLLIElement[];
  focusRoot: () => void;
  getClasses: () => string;
}

export function List(props: ListProps & RMWC.ComponentProps) {
  const {
    dense,
    twoLine,
    avatarList,
    nonInteractive,
    onAction,
    ...rest
  } = props;
  const { rootEl } = useListFoundation(props);
  const className = useClassNames(props, [
    'mdc-list',
    {
      'mdc-list--dense': dense,
      'mdc-list--two-line': twoLine,
      'mdc-list--avatar-list': avatarList,
      'mdc-list--non-interactive': nonInteractive
    }
  ]);
  return <Tag {...rest} element={rootEl} className={className} />;
}
