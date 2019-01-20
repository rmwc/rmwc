import * as React from 'react';

//@ts-ignore
import { MDCListFoundation } from '@material/list';
import { FoundationComponent, componentFactory } from '@rmwc/base';

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
  root = this.createElement('root');

  constructor(props: ListProps) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleFocusIn = this.handleFocusIn.bind(this);
    this.handleFocusOut = this.handleFocusOut.bind(this);
  }

  get listElements(): HTMLLIElement[] {
    return [].slice.call(
      this.root.ref &&
        this.root.ref.querySelectorAll(
          MDCListFoundation.strings.ENABLED_ITEMS_SELECTOR
        )
    );
  }

  componentDidMount() {
    super.componentDidMount();
    this.foundation.layout();
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
          value: string
        ) => {
          const element = this.listElements[index];
          if (element) {
            element.setAttribute(attr, value);
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
          tabIndexValue: string
        ) => {
          const element = this.listElements[listItemIndex];
          const listItemChildren: Element[] = [].slice.call(
            element.querySelectorAll(
              MDCListFoundation.strings.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX
            )
          );
          listItemChildren.forEach(ele =>
            ele.setAttribute('tabindex', tabIndexValue)
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
          return toggleEl.checked;
        },
        setCheckedCheckboxOrRadioAtIndex: (
          index: number,
          isChecked: boolean
        ) => {
          const listItem = this.listElements[index];
          const toggleEl = listItem.querySelector(
            MDCListFoundation.strings.CHECKBOX_RADIO_SELECTOR
          );
          toggleEl.checked = isChecked;

          const event = document.createEvent('Event');
          event.initEvent('change', true, true);
          toggleEl.dispatchEvent(event);
        },
        isFocusInsideList: () => {
          return (
            this.root.ref && this.root.ref.contains(document.activeElement)
          );
        }
      }))
    );
  }

  handleClick(evt: React.MouseEvent) {
    this.props.onClick && this.props.onClick(evt);
  }

  handleKeydown(evt: React.KeyboardEvent) {
    this.props.onKeyDown && this.props.onKeyDown(evt);
  }

  handleFocusIn(evt: React.FocusEvent) {
    this.props.onFocus && this.props.onFocus(evt);
  }

  handleFocusOut(evt: React.FocusEvent) {
    this.props.onBlur && this.props.onBlur(evt);
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
