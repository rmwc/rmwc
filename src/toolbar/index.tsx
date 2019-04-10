import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { MDCToolbarFoundation } from '@material/toolbar';
import { componentFactory, FoundationComponent } from '@rmwc/base';
import { Icon, IconProps } from '@rmwc/icon';
import { withRipple } from '@rmwc/ripple';
import { SpecificEventListener } from '@material/base/types';

export interface ToolbarProps {
  /** Makes the toolbar fixed */
  fixed?: boolean;
  /** Adds a waterfall effect on scroll */
  waterfall?: boolean;
  /** Fixes the last row of a multi-row toolbar */
  fixedLastrowOnly?: boolean;
  /** makes the toolbar flexible */
  flexible?: boolean;
  /** further defines the background and title movement behavior, use in conjunction with flexible. */
  flexibleDefaultBehavior?: boolean;
}

const ToolbarRoot = componentFactory<ToolbarProps>({
  displayName: 'TabBarRoot',
  tag: 'header',
  classNames: (props: ToolbarProps) => [
    'mdc-toolbar',
    {
      'mdc-toolbar--fixed': props.fixed,
      'mdc-toolbar--waterfall': props.waterfall,
      'mdc-toolbar--fixed-lastrow-only': props.fixedLastrowOnly,
      'mdc-toolbar--flexible': props.flexible,
      'mdc-toolbar--flexible-default-behavior': props.flexibleDefaultBehavior
    }
  ],
  defaultProps: {
    fixed: false,
    waterfall: false,
    fixedLastrowOnly: false,
    flexible: false,
    flexibleDefaultBehavior: false
  },
  consumeProps: [
    'fixed',
    'waterfall',
    'fixedLastrowOnly',
    'flexible',
    'flexibleDefaultBehavior'
  ]
});

/** A Toolbar title  */
export interface ToolbarTitleProps {}

/** A Toolbar title  */
export const ToolbarTitle = componentFactory<ToolbarTitleProps>({
  displayName: 'ToolbarTitle',
  classNames: ['mdc-toolbar__title']
});

/** A section of the Toolbar */
export interface ToolbarSectionProps {
  /** Aligns the ToolbarSection at the start. */
  alignStart?: boolean;
  /** Aligns the ToolbarSection at the end. */
  alignEnd?: boolean;
  /** Makes the ToolbarSection shrink to fit. */
  shrinkToFit?: boolean;
}

/** A section of the Toolbar */
export const ToolbarSection = componentFactory<ToolbarSectionProps>({
  displayName: 'ToolbarSection',
  tag: 'section',
  classNames: (props: ToolbarSectionProps) => [
    'mdc-toolbar__section',
    {
      'mdc-toolbar__section--align-start': props.alignStart,
      'mdc-toolbar__section--align-end': props.alignEnd,
      'mdc-toolbar__section--shrink-to-fit': props.shrinkToFit
    }
  ],
  defaultProps: {
    alignStart: false,
    alignEnd: false,
    shrinkToFit: false
  },
  consumeProps: ['alignStart', 'alignEnd', 'shrinkToFit']
});

/** A Toolbar row  */
export interface ToolbarRowProps {}

/** A Toolbar row  */
export const ToolbarRow = componentFactory<ToolbarRowProps>({
  displayName: 'ToolbarRow',
  classNames: ['mdc-toolbar__row']
});

/** This component can be placed after a fixed Toolbar component to fill in the space. */
export interface ToolbarFixedAdjustProps {}

/** This component can be placed after a fixed Toolbar component to fill in the space. */
export const ToolbarFixedAdjust = componentFactory<ToolbarFixedAdjustProps>({
  displayName: 'ToolbarFixedAdjust',
  classNames: ['mdc-toolbar-fixed-adjust']
});

/** A Menu Icon For the Toolbar. This is an instance of the Icon component. */
export interface ToolbarMenuIconProps extends IconProps {}

/** A Menu Icon For the Toolbar. This is an instance of the Icon component. */
export const ToolbarMenuIcon = withRipple({ unbounded: true, surface: false })(
  componentFactory<ToolbarMenuIconProps>({
    displayName: 'ToolbarMenuIcon',
    tag: Icon,
    classNames: ['mdc-toolbar__menu-icon']
  })
);

/** A standard Icon for toolbar actions. This is an instance of the Icon component. */
export interface ToolbarIconProps extends IconProps {}

/** A standard Icon for toolbar actions. This is an instance of the Icon component. */
export const ToolbarIcon = withRipple({
  unbounded: true
})(
  componentFactory<ToolbarIconProps>({
    displayName: 'ToolbarIcon',
    tag: Icon,
    classNames: ['mdc-toolbar__icon']
  })
);

/** A Toolbar component. */
export const Toolbar = (props: ToolbarProps & RMWC.ComponentProps) => {
  /** Generate a key that will force a re-init if props change */
  const key = `${props.fixed ? 'fixed' : ''} ${
    props.fixedLastrowOnly ? 'fixed-last-row' : ''
  } ${props.flexible ? 'flexible' : ''}`;
  return <ToolbarBase key={key} {...props} />;
};

Toolbar.displayName = 'Toolbar';

class ToolbarBase extends FoundationComponent<
  MDCToolbarFoundation,
  ToolbarProps
> {
  static displayName = 'Toolbar';

  private root = this.createElement('root');
  fixedAdjustElement_: HTMLElement | null = null;

  componentDidMount() {
    super.componentDidMount();

    // loop through and get the fixed adjust element
    if (this.root.ref && this.root.ref.parentNode) {
      for (let i = 0; i < this.root.ref.parentNode.children.length; i++) {
        const el = this.root.ref.parentNode.children[i];
        if (
          (el.getAttribute('class') || '').includes('mdc-toolbar-fixed-adjust')
        ) {
          this.fixedAdjustElement = el as HTMLElement;
          break;
        }
      }
    }
  }

  get firstRowElement(): HTMLElement | null {
    return (
      this.root.ref &&
      this.root.ref.querySelector(
        MDCToolbarFoundation.strings.FIRST_ROW_SELECTOR
      )
    );
  }

  get titleElement(): HTMLElement | null {
    return (
      this.root.ref &&
      this.root.ref.querySelector(MDCToolbarFoundation.strings.TITLE_SELECTOR)
    );
  }

  set fixedAdjustElement(fixedAdjustElement) {
    this.fixedAdjustElement_ = fixedAdjustElement;
    this.foundation.updateAdjustElementStyles();
  }

  get fixedAdjustElement(): HTMLElement | null {
    return this.fixedAdjustElement_;
  }

  get window() {
    if (
      this.root.ref &&
      this.root.ref.ownerDocument &&
      this.root.ref.ownerDocument.defaultView
    ) {
      return this.root.ref.ownerDocument.defaultView;
    }
    return window;
  }

  getDefaultFoundation() {
    return new MDCToolbarFoundation({
      hasClass: (className: string) =>
        !!this.root.ref && this.root.ref.classList.contains(className),
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className),
      registerScrollHandler: (handler: SpecificEventListener<'scroll'>) => {
        this.window.addEventListener('scroll', handler);
      },
      deregisterScrollHandler: (handler: SpecificEventListener<'scroll'>) =>
        this.window.removeEventListener('scroll', handler),
      registerResizeHandler: (handler: SpecificEventListener<'resize'>) =>
        this.window.addEventListener('resize', handler),
      deregisterResizeHandler: (handler: SpecificEventListener<'resize'>) =>
        this.window.removeEventListener('resize', handler),
      getViewportWidth: () => this.window.innerWidth,
      getViewportScrollY: () => this.window.pageYOffset,
      getOffsetHeight: () => (this.root.ref ? this.root.ref.offsetHeight : 0),
      getFirstRowElementOffsetHeight: () => {
        console.log(this.firstRowElement && this.firstRowElement.offsetHeight);
        return this.firstRowElement ? this.firstRowElement.offsetHeight : 0;
      },
      notifyChange: (evtData: { flexibleExpansionRatio: number }) =>
        this.emit('onChange', evtData),
      setStyle: (property: string, value: string) =>
        this.root.ref && this.root.setStyle(property, value),
      setStyleForTitleElement: (property: string, value: string) =>
        this.titleElement &&
        this.titleElement.style.setProperty(property, value),
      setStyleForFlexibleRowElement: (property: string, value: string) =>
        this.firstRowElement &&
        this.firstRowElement.style.setProperty(property, value),
      setStyleForFixedAdjustElement: (property: string, value: string) => {
        if (this.fixedAdjustElement) {
          this.fixedAdjustElement.style.setProperty(property, value);
        }
      }
    });
  }

  render() {
    const { ...rest } = this.props;
    return <ToolbarRoot {...this.root.props(rest)} ref={this.root.setRef} />;
  }
}
