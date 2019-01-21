import * as React from 'react';
// @ts-ignore
import { MDCToolbarFoundation } from '@material/toolbar';
import { componentFactory, FoundationComponent } from '@rmwc/base';
import { Icon, IconProps } from '@rmwc/icon';
import { withRipple } from '@rmwc/ripple';

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

export const ToolbarRoot = componentFactory<ToolbarProps>({
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
export const ToolbarTitle = componentFactory<{}>({
  displayName: 'ToolbarTitle',
  classNames: ['mdc-toolbar__title']
});

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
export const ToolbarRow = componentFactory<{}>({
  displayName: 'ToolbarRow',
  classNames: ['mdc-toolbar__row']
});

/**
 * This component can be placed after a fixed Toolbar component to fill in the space.
 */
export const ToolbarFixedAdjust = componentFactory<{}>({
  displayName: 'ToolbarFixedAdjust',
  classNames: ['mdc-toolbar-fixed-adjust']
});

export interface ToolbarMenuIconProps extends IconProps {}

/**
 * A Menu Icon For the Toolbar. This is an instance of the Icon component.
 */
export const ToolbarMenuIcon = withRipple({ unbounded: true })(
  componentFactory<ToolbarMenuIconProps>({
    displayName: 'ToolbarMenuIcon',
    tag: Icon,
    classNames: ['mdc-toolbar__menu-icon']
  })
);

export interface ToolbarIconProps extends IconProps {}

/**
 * A standard Icon for toolbar actions. This is an instance of the Icon component.
 */
export const ToolbarIcon = withRipple({
  unbounded: true
})(
  componentFactory<ToolbarIconProps>({
    displayName: 'ToolbarIcon',
    tag: Icon,
    classNames: ['mdc-toolbar__icon']
  })
);

export class Toolbar extends FoundationComponent<ToolbarProps> {
  static displayName = 'Toolbar';

  root = this.createElement('root');
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

  getDefaultFoundation() {
    return new MDCToolbarFoundation({
      hasClass: (className: string) => this.root.hasClass(className),
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className),
      registerScrollHandler: (handler: (evt: Event) => void) =>
        window.addEventListener('scroll', handler),
      deregisterScrollHandler: (handler: (evt: Event) => void) =>
        window.removeEventListener('scroll', handler),
      registerResizeHandler: (handler: (evt: Event) => void) =>
        window.addEventListener('resize', handler),
      deregisterResizeHandler: (handler: (evt: Event) => void) =>
        window.removeEventListener('resize', handler),
      getViewportWidth: () => window.innerWidth,
      getViewportScrollY: () => window.pageYOffset,
      getOffsetHeight: () => this.root.ref && this.root.ref.offsetHeight,
      getFirstRowElementOffsetHeight: () =>
        this.firstRowElement && this.firstRowElement.offsetHeight,
      notifyChange: (evtData: { flexibleExpansionRatio: number }) =>
        this.emit('onChange', evtData),
      setStyle: (property: string, value: string) =>
        this.root.ref && this.root.ref.style.setProperty(property, value),
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
    return <ToolbarRoot ref={this.root.setRef} {...rest} />;
  }
}
