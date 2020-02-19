import * as RMWC from '@rmwc/types';
import * as React from 'react';

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
  /** Fires when a tab has been interacted with. This is captures both keyboard and click events. evt.detail = { tabId: string } */
  onInteraction?: (evt: TabOnInteractionEventT) => void;
}

export type TabApi = {
  getActive: () => boolean;
  activate: (computeIndicatorClientRect: ClientRect) => void;
  deactivate: () => void;
  computeIndicatorClientRect: () => ClientRect;
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
    const { stacked, ...rest } = props;
    const className = useClassNames(props, [
      'mdc-tab',
      {
        'mdc-tab--stacked': stacked
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
      <div className="mdc-tab__content" ref={contentEl.setRef}>
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
    </TabRoot>
  );
});
