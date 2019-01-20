import * as React from 'react';

// @ts-ignore
import { MDCTabFoundation } from '@material/tab';

import { FoundationComponent, componentFactory } from '@rmwc/base';
import { randomId } from '@rmwc/base/utils/randomId';
import { IconProps, Icon, IconPropT } from '@rmwc/icon';
import { withRipple, RippleSurface } from '@rmwc/ripple';

import { withTabBarContext, TabBarContextT } from './tab-bar-context';
import { TabIndicator } from './tab-indicator';

export interface TabProps {
  /** A label for the tab. */
  label?: any;
  /** The label for the tab, passed as children. */
  children?: React.ReactNode;
  /** The icon to use for the tab. */
  icon?: IconPropT;
  /** Stacks the icon on top of the text label */
  stacked?: boolean;
  /** Restricts the indicator to the content */
  restrictIndicator?: boolean;
  /** Fires when a tab has been interacted with. This is captures both keyboard and click events. */
  onInteraction?: boolean;
}

export const TabRoot = withRipple({ surface: false })(
  componentFactory<TabProps>({
    displayName: 'TabRoot',
    tag: 'button',
    classNames: (props: TabProps) => [
      'mdc-tab',
      {
        'mdc-tab--stacked': props.stacked
      }
    ],
    consumeProps: ['stacked']
  })
);

/** A Tab icon. This is an instance of the Icon component. */
export const TabIcon = componentFactory<IconProps>({
  displayName: 'TabIcon',
  tag: Icon,
  classNames: ['mdc-tab__icon']
});

/** A Tab component */
export const Tab = withTabBarContext()(
  class extends FoundationComponent<
    TabProps & { contextApi?: TabBarContextT }
  > {
    static displayName = 'Tab';

    _id = randomId('tab');
    root = this.createElement('root');
    tabIndicator: TabIndicator | null = null;
    content: HTMLDivElement | null = null;
    rippleSurfaceApi: RippleSurface | null = null;

    constructor(props: TabProps & { contextApi?: TabBarContextT }) {
      super(props);
      this.props.contextApi && this.props.contextApi.registerTab(this);
      this.handleClick = this.handleClick.bind(this);
    }

    componentWillUnmount() {
      this.props.contextApi && this.props.contextApi.unregisterTab(this);
    }

    get id() {
      return this.props.id
        ? this.props.id
        : (this as any)._reactInternalFiber.key || this._id;
    }

    getDefaultFoundation() {
      return new MDCTabFoundation(
        /** @type {!MDCTabAdapter} */ ({
          setAttr: (attr: string, value: any) => this.root.addProp(attr, value),
          addClass: (className: string) => this.root.addClass(className),
          removeClass: (className: string) => this.root.removeClass(className),
          hasClass: (className: string) => this.root.hasClass(className),
          activateIndicator: (previousIndicatorClientRect: ClientRect) =>
            this.tabIndicator &&
            this.tabIndicator.activate(previousIndicatorClientRect),
          deactivateIndicator: () =>
            this.tabIndicator && this.tabIndicator.deactivate(),
          notifyInteracted: () => {
            const evt = this.emit(
              'onInteraction',
              { tabId: this.id },
              true /* bubble */
            );

            this.props.contextApi &&
              this.props.contextApi.onTabInteraction(evt);
          },
          getOffsetLeft: () => this.root.ref && this.root.ref.offsetLeft,
          getOffsetWidth: () => this.root.ref && this.root.ref.offsetWidth,
          getContentOffsetLeft: () => this.content && this.content.offsetLeft,
          getContentOffsetWidth: () => this.content && this.content.offsetWidth,
          focus: () => this.root.ref && this.root.ref.focus()
        })
      );
    }

    handleClick(evt: React.MouseEvent) {
      this.props.onClick && this.props.onClick(evt);
      this.foundation.handleClick(evt);
    }

    get active() {
      return this.foundation.isActive();
    }

    set focusOnActivate(focusOnActivate: string) {
      this.foundation.setFocusOnActivate(focusOnActivate);
    }

    activate(computeIndicatorClientRect: ClientRect) {
      this.foundation.activate(computeIndicatorClientRect);
    }

    deactivate() {
      this.foundation.deactivate();
    }

    computeIndicatorClientRect() {
      return this.tabIndicator && this.tabIndicator.computeContentClientRect();
    }

    computeDimensions() {
      return this.foundation.computeDimensions();
    }

    focus() {
      this.root.ref && this.root.ref.focus();
    }

    render() {
      const {
        children,
        label,
        icon,
        stacked,
        restrictIndicator,
        contextApi,
        ...rest
      } = this.props;
      return (
        <TabRoot
          {...this.root.props(rest)}
          onClick={this.handleClick}
          stacked={stacked}
          ref={this.root.setRef}
          ripple={{
            surface: this.rippleSurfaceApi
          }}
        >
          <div className="mdc-tab__content" ref={el => (this.content = el)}>
            {!!icon && <TabIcon icon={icon} />}
            {(children !== undefined || label !== undefined) && (
              <span className="mdc-tab__text-label">
                {label}
                {children}
              </span>
            )}
            {!!restrictIndicator && (
              <TabIndicator
                ref={(api: TabIndicator) => (this.tabIndicator = api)}
              />
            )}
          </div>
          {!restrictIndicator && (
            <TabIndicator
              ref={(api: TabIndicator) => (this.tabIndicator = api)}
            />
          )}
          <RippleSurface
            ref={(rippleSurfaceApi: RippleSurface) =>
              (this.rippleSurfaceApi = rippleSurfaceApi)
            }
            className="mdc-tab__ripple"
          />
        </TabRoot>
      );
    }
  }
);
