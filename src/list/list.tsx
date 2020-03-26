import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { MDCListFoundation } from '@material/list';
import { Tag, useClassNames, createComponent } from '@rmwc/base';
import { useListFoundation } from './foundation';
import { ListContext } from './list-context';

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
  /** Advanced: A reference to the MDCFoundation. */
  foundationRef?: React.Ref<MDCListFoundation | null>;
  /** Sets the list to allow the up arrow on the first element to focus the
   * last element of the list and vice versa. Defaults to true */ 
  wrapFocus?: boolean;
  /** Sets the lists vertical orientation. Defaults to true */
  vertical?: boolean;
  /** Sets the list to be a selection list. Enables the enter and space keys for selecting/deselecting a list item. Defaults to false */
  singleSelection?: boolean;
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
    vertical,
    singleSelection,
    ...rest
  } = props;
  const { rootEl, listItemClasses, setEnabled } = useListFoundation(props);

  const listItemValues= React.useMemo(() => ({
    getClassName: (index: number): string[]  =>  listItemClasses[index] || [],
    setEnabled
  }),[listItemClasses,setEnabled]);

  const className = useClassNames(props, [
    'mdc-list',
    {
      'mdc-list--dense': dense,
      'mdc-list--two-line': twoLine,
      'mdc-list--avatar-list': avatarList,
      'mdc-list--non-interactive': nonInteractive
    }
  ]);

  return  (
    <ListContext.Provider value={listItemValues}><Tag tag="ul" {...rest} element={rootEl} className={className} ref={ref} />
    </ListContext.Provider>
  )
});
