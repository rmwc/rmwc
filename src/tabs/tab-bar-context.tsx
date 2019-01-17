import * as React from 'react';

export type TabBarContextT = {
  onTabInteraction: (evt: any) => void;
  registerTab: (tab: any) => {};
  unregisterTab: (tab: any) => {};
};

export const TabBarContext = React.createContext({
  onTabInteraction: (evt: any) => {},
  registerTab: (tab: any) => {},
  unregisterTab: (tab: any) => {}
});

export const withTabBarContext = () => <
  P extends { contextApi?: TabBarContextT }
>(
  Component: React.ComponentType<P & { contextApi?: TabBarContextT }>
): React.ComponentType<P & { contextApi?: TabBarContextT }> => (props: P) => (
  <TabBarContext.Consumer>
    {contextApi => <Component {...props} contextApi={contextApi} />}
  </TabBarContext.Consumer>
);
