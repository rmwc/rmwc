import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { componentFactory, classNames } from '@rmwc/base';

/** A collapsible list component. */
export interface CollapsibleListProps {
  /** The handle that opens and closes the collapsible section. Usually a ListItem. */
  handle: React.ReactElement<any>;
  /** Show the collapsible list as open. */
  open?: boolean;
  /** Starts the collapsible list as open. */
  startOpen?: boolean;
  /** Callback for when the collapsible list opens. */
  onOpen?: () => void;
  /** Callback for when the collapsible list closes. */
  onClose?: () => void;
}

interface CollapsibleState {
  open: boolean;
  childrenStyle: React.CSSProperties;
}

const CollapsibleRoot = componentFactory<{}>({
  displayName: 'CollapsibleRoot',
  classNames: ['rmwc-collapsible-list']
});

const possiblyFocusElement = (el: Element | null) => {
  if (!el) return false;

  const tabIndex = el.getAttribute('tabindex');
  if (tabIndex && Number(tabIndex) >= 0) {
    (el as HTMLElement).focus();
    return true;
  }
  return false;
};

const getNextSibling = (
  el: HTMLElement | null,
  isBack: boolean
): HTMLElement | null => {
  if (!el) return null;

  const next = isBack ? el.previousElementSibling : el.nextElementSibling;

  if (next === null) {
    return getNextSibling(el.parentElement, isBack);
  }

  return next as HTMLElement;
};

/** A collapsible list component. */
export class CollapsibleList extends React.Component<
  CollapsibleListProps & RMWC.ComponentProps,
  CollapsibleState
> {
  static displayName = 'CollapsibleList';

  static getDerivedStateFromProps(
    props: CollapsibleListProps,
    state: CollapsibleState
  ) {
    if (props.open !== undefined && props.open !== state.open) {
      return {
        ...state,
        open: props.open
      };
    }

    return state;
  }

  childContainer: HTMLDivElement | null = null;
  root: HTMLDivElement | null = null;

  state: CollapsibleState = {
    open: !!this.props.startOpen || !!this.props.open,
    childrenStyle: {}
  };

  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  componentDidMount() {
    this.state.open && this.toggleOpen(this.state.open);
  }

  correctFocus(back: boolean) {
    window.requestAnimationFrame(() => {
      if (
        !this.state.open &&
        this.root &&
        this.root.contains(document.activeElement)
      ) {
        const sibling = getNextSibling(this.root, back);

        if (possiblyFocusElement(sibling)) {
          return;
        }
        if (sibling) {
          const els = sibling.querySelectorAll('[tabindex]');
          for (let i = 0; i < els.length; i++) {
            if (possiblyFocusElement(els[i])) {
              break;
            }
          }
        }
      }
    });
  }

  toggleOpen(isOpen: boolean) {
    const { onOpen, onClose } = this.props;
    const childrenStyle = {
      maxHeight: this.childContainer
        ? `${this.childContainer.offsetHeight}px`
        : '0px'
    };

    this.setState({ open: isOpen, childrenStyle }, () => {
      if (this.state.open) {
        onOpen && onOpen();
        setTimeout(() => {
          if (this.state.open) {
            this.setState({
              childrenStyle: {
                maxHeight: 'none'
              }
            });
          }
        }, 300);
      } else {
        onClose && onClose();
        window.requestAnimationFrame(() => {
          this.setState({
            childrenStyle: {}
          });
        });
      }
    });
  }

  handleClick(evt: React.MouseEvent) {
    // call events that might have been on the handle
    const { handle } = this.props;
    handle.props.onClick && handle.props.onClick(evt);

    this.toggleOpen(!this.state.open);
  }

  handleKeydown(evt: React.KeyboardEvent) {
    // call events that might have been on the handle
    const { handle } = this.props;
    handle.props.onKeyDown && handle.props.onKeyDown(evt);

    switch (evt.which) {
      case 13:
        this.toggleOpen(!this.state.open);
        return;
      case 39:
        this.toggleOpen(true);
        return;
      case 38:
      case 40:
      case 9:
        const isBack = evt.shiftKey || evt.which === 38;
        this.correctFocus(isBack);
        return;
      case 37:
        this.toggleOpen(false);
        return;
      default:
        break;
    }
  }

  handleFocus(evt: React.FocusEvent) {
    if (
      !this.state.open &&
      this.root &&
      this.childContainer &&
      this.childContainer.contains(document.activeElement)
    ) {
      const el = this.root.querySelector(
        '.rmwc-collapsible-list__handle .mdc-list-item'
      );
      el && (el as HTMLElement).focus();
    }
  }

  render() {
    const {
      children,
      handle,
      onOpen,
      onClose,
      open: openProp,
      startOpen,
      ...rest
    } = this.props;
    const { open, childrenStyle } = this.state;

    return (
      <CollapsibleRoot
        {...rest}
        onFocus={this.handleFocus}
        ref={(el: HTMLDivElement) => (this.root = el)}
        className={classNames('rmwc-collapsible-list', {
          ['rmwc-collapsible-list--open']: open
        })}
      >
        <div className="rmwc-collapsible-list__handle">
          {React.cloneElement(handle, {
            ...handle.props,
            onClick: this.handleClick,
            onKeyDown: this.handleKeydown
          })}
        </div>
        <div className="rmwc-collapsible-list__children" style={childrenStyle}>
          <div
            className="rmwc-collapsible-list__children-inner"
            ref={el => (this.childContainer = el)}
          >
            {children}
          </div>
        </div>
      </CollapsibleRoot>
    );
  }
}
