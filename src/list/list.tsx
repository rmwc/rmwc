import * as RMWC from '@rmwc/types';
import * as React from 'react';

//@ts-ignore
import { MDCListFoundation } from '@material/list';
import { FoundationComponent, componentFactory, matches } from '@rmwc/base';

export interface ListProps {
  /** Reduces the padding on List items. */
  dense?: boolean;
  /** Gives more space for dual lined list items. */
  twoLine?: boolean;
  /** Makes the list start detail circular for avatars. */
  avatarList?: boolean;
  /** Makes the list non interactive. In addition, you'll have to set `ripple={false}` on the individual ListItems. */
  nonInteractive?: boolean;
}

/** A List Component */
export const ListRoot = componentFactory<ListProps>({
  displayName: 'ListRoot',
  defaultProps: {
    dense: undefined,
    twoLine: undefined,
    avatarList: undefined,
    nonInteractive: undefined
  },
  classNames: (props: ListProps) => [
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

export class List extends FoundationComponent<ListProps> {
  private root = this.createElement('root');

  constructor(props: ListProps) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleFocusIn = this.handleFocusIn.bind(this);
    this.handleFocusOut = this.handleFocusOut.bind(this);
  }

  get listElements(): HTMLLIElement[] {
    if (this.root.ref) {
      return [].slice.call(
        this.root.ref.querySelectorAll(
          MDCListFoundation.strings.ENABLED_ITEMS_SELECTOR
        )
      );
    }
    return [];
  }

  componentDidMount() {
    super.componentDidMount();
    this.foundation.layout();
  }

  focusItemAtIndex(index: number) {
    this.foundation.adapter_.focusItemAtIndex(index);
  }

  getDefaultFoundation() {
    return new MDCListFoundation(
      /** @type {!MDCListAdapter} */ (Object.assign({
        getListItemCount: () => this.listElements.length,
        getFocusedElementIndex: () =>
          this.listElements.indexOf(document.activeElement as HTMLLIElement),
        setAttributeForElementIndex: (
          index: number,
          attr: string,
          value: string | number
        ) => {
          // This value is getting set and never getting set back
          // This is causing list items to be un-tabbable
          if (attr === 'tabindex' && value === -1) {
            return;
          }

          const element = this.listElements[index];
          if (element) {
            element.setAttribute(attr, String(value));
          }
        },
        removeAttributeForElementIndex: (index: number, attr: string) => {
          const element = this.listElements[index];
          if (element) {
            element.removeAttribute(attr);
          }
        },
        addClassForElementIndex: (index: number, className: string) => {
          const element = this.listElements[index];
          if (element) {
            element.classList.add(className);
          }
        },
        removeClassForElementIndex: (index: number, className: string) => {
          const element = this.listElements[index];
          if (element) {
            element.classList.remove(className);
          }
        },
        focusItemAtIndex: (index: number) => {
          const element = this.listElements[index];
          if (element) {
            element.focus();
          }
        },
        setTabIndexForListItemChildren: (
          listItemIndex: number,
          tabIndexValue: string | number
        ) => {
          const element = this.listElements[listItemIndex];
          const listItemChildren: Element[] = [].slice.call(
            element.querySelectorAll(
              MDCListFoundation.strings.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX
            )
          );
          listItemChildren.forEach(ele =>
            ele.setAttribute('tabindex', String(tabIndexValue))
          );
        },
        followHref: (index: number) => {
          const listItem = this.listElements[index];
          if (listItem && (listItem as any).href) {
            listItem.click();
          }
        },
        hasCheckboxAtIndex: (index: number) => {
          const listItem = this.listElements[index];
          return !!listItem.querySelector(
            MDCListFoundation.strings.CHECKBOX_SELECTOR
          );
        },
        hasRadioAtIndex: (index: number) => {
          const listItem = this.listElements[index];
          return !!listItem.querySelector(
            MDCListFoundation.strings.RADIO_SELECTOR
          );
        },
        isCheckboxCheckedAtIndex: (index: number) => {
          const listItem = this.listElements[index];
          const toggleEl = listItem.querySelector(
            MDCListFoundation.strings.CHECKBOX_SELECTOR
          );

          return toggleEl ? toggleEl.checked : false;
        },
        setCheckedCheckboxOrRadioAtIndex: (
          index: number,
          isChecked: boolean
        ) => {
          const listItem = this.listElements[index];
          const toggleEl = listItem.querySelector(
            MDCListFoundation.strings.CHECKBOX_RADIO_SELECTOR
          );

          if (toggleEl) {
            toggleEl.checked = isChecked;

            const event = document.createEvent('Event');
            event.initEvent('change', true, true);
            toggleEl.dispatchEvent(event);
          }
        },
        isFocusInsideList: () => {
          return (
            this.root.ref && this.root.ref.contains(document.activeElement)
          );
        }
      }))
    );
  }

  /**
   * Used to figure out which list item this event is targetting. Or returns -1 if
   * there is no list item
   */
  getListItemIndex(
    evt: React.FocusEvent | React.KeyboardEvent | React.MouseEvent
  ) {
    let eventTarget = evt.target as HTMLElement | null;
    let index = -1;

    // Find the first ancestor that is a list item or the list.
    while (
      eventTarget &&
      !eventTarget.classList.contains(
        MDCListFoundation.cssClasses.LIST_ITEM_CLASS
      ) &&
      !eventTarget.classList.contains(MDCListFoundation.cssClasses.ROOT)
    ) {
      eventTarget = eventTarget.parentElement as HTMLLIElement;
    }

    // Get the index of the element if it is a list item.
    if (
      eventTarget &&
      eventTarget.classList.contains(
        MDCListFoundation.cssClasses.LIST_ITEM_CLASS
      )
    ) {
      index = this.listElements.indexOf(eventTarget as HTMLLIElement);
    }

    return index;
  }

  handleClick(evt: React.MouseEvent) {
    this.props.onClick && this.props.onClick(evt);

    const index = this.getListItemIndex(evt);

    // Toggle the checkbox only if it's not the target of the event, or the checkbox will have 2 change events.
    const toggleCheckbox = !matches(
      evt.target as HTMLElement,
      MDCListFoundation.strings.CHECKBOX_RADIO_SELECTOR
    );

    this.foundation.handleClick(index, toggleCheckbox);
  }

  handleKeydown(evt: React.KeyboardEvent<HTMLElement>) {
    this.props.onKeyDown && this.props.onKeyDown(evt);

    const index = this.getListItemIndex(evt);

    if (index >= 0) {
      this.foundation.handleKeydown(
        evt,
        evt.target instanceof Element &&
          evt.target.classList.contains(
            MDCListFoundation.cssClasses.LIST_ITEM_CLASS
          ),
        index
      );
    }
  }

  handleFocusIn(evt: React.FocusEvent) {
    this.props.onFocus && this.props.onFocus(evt);
    this.foundation.handleFocusIn(evt, this.getListItemIndex(evt));
  }

  handleFocusOut(evt: React.FocusEvent) {
    this.props.onBlur && this.props.onBlur(evt);
    this.foundation.handleFocusOut(evt, this.getListItemIndex(evt));
  }

  render() {
    const { ...rest } = this.props;
    return (
      <ListRoot
        {...rest}
        ref={this.root.setRef}
        onClick={this.handleClick}
        onKeyDown={this.handleKeydown}
        onFocus={this.handleFocusIn}
        onBlur={this.handleFocusOut}
      />
    );
  }
}
