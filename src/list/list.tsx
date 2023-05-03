import * as RMWC from '@rmwc/types';
import React from 'react';
import { MDCListFoundation } from '@material/list';
import { Tag, useClassNames, createComponent } from '@rmwc/base';
import { useListFoundation } from './foundation';

export type ListOnActionEventT = RMWC.CustomEventT<{ index: number }>;

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
  apiRef?: (api: ListApi | null) => void;
  /** Advanced: A reference to the MDCFoundation. */
  foundationRef?: React.Ref<MDCListFoundation | null>;
  /** Sets the list to allow the up arrow on the first element to focus the
   * last element of the list and vice versa. Defaults to true */

  wrapFocus?: boolean;
  /** Sets the lists vertical orientation. Defaults to true */
  vertical?: boolean;
}

export interface ListApi {
  listElements: () => HTMLLIElement[];
  focusRoot: () => void;
  getClasses: () => string;
  addClassToElementIndex: (index: number, className: string) => void;
  removeClassFromElementAtIndex: (index: number, className: string) => void;
  setAttributeForElementIndex: (
    index: number,
    attr: string,
    value: any
  ) => void;
  getListItemCount: () => number;
  focusItemAtIndex: (index: number) => void;
  selectedIndex: number | number[];
  setSelectedIndex: (index: number) => void;
}

export const List = createComponent<ListProps>(function List(props, ref) {
  const {
    dense,
    twoLine,
    avatarList,
    apiRef,
    nonInteractive,
    onAction,
    foundationRef,
    wrapFocus,
    ...rest
  } = props;
  const { rootEl } = useListFoundation({
    ...props,
    wrapFocus
  });
  const className = useClassNames(props, [
    'mdc-deprecated-list',
    {
      'mdc-deprecated-list--dense': dense,
      'mdc-deprecated-list--two-line': twoLine,
      'mdc-deprecated-list--avatar-list': avatarList,
      'mdc-deprecated-list--non-interactive': nonInteractive
    }
  ]);
  return (
    <Tag tag="ul" {...rest} element={rootEl} className={className} ref={ref} />
  );
});
