import * as RMWC from '@rmwc/types';
import React from 'react';

import { MDCTabFoundation } from '@material/tab';

import {
  useClassNames,
  Tag,
  FoundationElement,
  createComponent
} from '@rmwc/base';
import { IconProps, Icon } from '@rmwc/icon';
import { withRipple, RippleSurface } from '@rmwc/ripple';

import { TabBarContext } from './tab-bar-context';
import { TabIndicator } from './tab-indicator';
import { useTabFoundation } from './tab-foundation';

export type TabOnInteractionEventT = RMWC.CustomEventT<{ tabId: string }>;

/** A Tab component */
export interface TabProps {
  /** A label for the tab. */
  label?: any;
  /** The label for the tab, passed as children. */
  children?: React.ReactNode;
  /** The icon to use for the tab. */
  icon?: RMWC.IconPropT;
  /** Optionally use a custom icon for the active indicator, instead of the underline. */
  iconIndicator?: RMWC.IconPropT;
  /** Stacks the icon on top of the text label */
  stacked?: boolean;
  /** Restricts the indicator to the content */
  restrictIndicator?: boolean;
  /** Indicates that the tab should shrink in size to be as narrow as possible without causing text to wrap. */
  minWidth?: boolean;
  /** Fires when a tab has been interacted with. This is captures both keyboard and click events. evt.detail = { tabId: string } */
  onInteraction?: (evt: TabOnInteractionEventT) => void;
  /** Advanced: A reference to the MDCFoundation. */
  foundationRef?: React.Ref<MDCTabFoundation | null>;
  /** Focuses the tab when activated. Defaults to true. */
  focusOnActivate?: boolean;
}

export type TabApi = {
  getActive: () => boolean;
  activate: (computeIndicatorClientRect: DOMRect) => void;
  deactivate: () => void;
  computeIndicatorClientRect: () => DOMRect;
  computeDimensions: MDCTabFoundation['computeDimensions'];
  focus: () => void;
  id: string;
  getIndex: () => number;
};

type TabRootProps = TabProps & {
  children?: React.ReactNode;
  element?: FoundationElement<any, any>;
};

const TabRoot = withRipple({ surface: false })(
  createComponent<TabRootProps>(function TabRoot(props, ref) {
    const { stacked, minWidth, ...rest } = props;
    const className = useClassNames(props, [
      'mdc-tab',
      {
        'mdc-tab--stacked': stacked,
        'mdc-tab--min-width': minWidth
      }
    ]);
    return <Tag tag="button" {...rest} className={className} ref={ref} />;
  })
);

/** A Tab icon. This is an instance of the Icon component. */
const TabIcon = React.memo(function TabIcon(props: IconProps & RMWC.HTMLProps) {
  return <Icon {...props} className="mdc-tab__icon" />;
});

/** A Tab component */
export const Tab = createComponent<TabProps>(function Tab(props, ref) {
  const {
    children,
    label,
    icon,
    stacked,
    restrictIndicator,
    onInteraction,
    iconIndicator,
    foundationRef,
    focusOnActivate,
    ...rest
  } = props;

  const { rootEl, contentEl, setTabIndicatorApi } = useTabFoundation(props);

  const contextApi = React.useContext(TabBarContext);

  const tabIndicator = (
    <TabIndicator
      apiRef={setTabIndicatorApi}
      transition={contextApi.indicatorTransition}
      icon={iconIndicator}
    />
  );

  return (
    <TabRoot element={rootEl} stacked={stacked} {...rest} ref={ref}>
      <div
        className="mdc-tab__content"
        ref={contentEl.reactRef as React.Ref<HTMLDivElement>}
      >
        {!!icon && <TabIcon icon={icon} />}
        {(children !== undefined || label !== undefined) && (
          <span className="mdc-tab__text-label">
            {label}
            {children}
          </span>
        )}
        {!!restrictIndicator && tabIndicator}
      </div>
      {!restrictIndicator && tabIndicator}
      <RippleSurface className="mdc-tab__ripple" />
      <div className="mdc-tab__focus-ring"></div>
    </TabRoot>
  );
});
