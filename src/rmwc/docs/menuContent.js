import * as React from 'react';

import Loadable from 'react-loadable';

const Loading = () => (
  <div
    style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      boxSizing: 'border-box'
    }}
  >
    Loading...
  </div>
);

export const menuContent = [
  {
    label: 'Getting Started',
    options: [
      {
        label: 'Installation',
        url: `/installation`,
        component: Loadable({
          loader: () => import('./installation.md'),
          loading: Loading
        })
      },
      {
        label: 'Usage',
        url: `/usage`,
        component: Loadable({
          loader: () => import('./usage.md'),
          loading: Loading
        })
      },
      {
        label: 'Styling and Theming',
        url: `/styling-theming`,
        component: Loadable({
          loader: () => import('./styling-theming.md'),
          loading: Loading
        })
      },
      {
        label: 'Project Methodology',
        url: `/methodology`,
        component: Loadable({
          loader: () => import('./methodology.md'),
          loading: Loading
        })
      }
    ]
  },
  {
    label: 'Buttons',
    options: [
      {
        label: 'Buttons',
        url: `/buttons`,
        component: Loadable({
          loader: () => import('@rmwc/button/README.md'),
          loading: Loading
        })
      },
      {
        label: 'Fabs',
        url: `/fabs`,
        component: Loadable({
          loader: () => import('@rmwc/fab/README.md'),
          loading: Loading
        })
      },
      {
        label: 'Icon Buttons',
        url: `/icon-buttons`,
        component: Loadable({
          loader: () => import('@rmwc/icon-button/README.md'),
          loading: Loading
        })
      }
    ]
  },
  {
    label: 'Cards',
    url: `/cards`,
    component: Loadable({
      loader: () => import('@rmwc/card/README.md'),
      loading: Loading
    })
  },
  {
    label: 'Chips',
    url: `/chips`,
    component: Loadable({
      loader: () => import('@rmwc/chip/README.md'),
      loading: Loading
    })
  },
  {
    label: 'Data Tables',
    url: `/data-tables`,
    component: Loadable({
      loader: () => import('@rmwc/data-table/README.md'),
      loading: Loading
    })
  },
  {
    label: 'Dialogs',
    url: `/dialogs`,
    component: Loadable({
      loader: () => import('@rmwc/dialog/README.md'),
      loading: Loading
    })
  },
  {
    label: 'Drawers',
    url: `/drawers`,
    component: Loadable({
      loader: () => import('@rmwc/drawer/README.md'),
      loading: Loading
    })
  },
  {
    label: 'Elevation',
    url: `/elevation`,
    component: Loadable({
      loader: () => import('@rmwc/elevation/README.md'),
      loading: Loading
    })
  },
  {
    label: 'Grid Lists',
    url: `/grid-lists`,
    component: Loadable({
      loader: () => import('@rmwc/grid-list/README.md'),
      loading: Loading
    })
  },
  {
    label: 'Image Lists',
    url: `/image-lists`,
    component: Loadable({
      loader: () => import('@rmwc/image-list/README.md'),
      loading: Loading
    })
  },
  {
    label: 'Inputs and Controls',
    options: [
      {
        label: 'Checkboxes',
        url: `/checkboxes`,
        component: Loadable({
          loader: () => import('@rmwc/checkbox/README.md'),
          loading: Loading
        })
      },
      {
        label: 'FormFields',
        url: `/formfields`,
        component: Loadable({
          loader: () => import('@rmwc/formfield/README.md'),
          loading: Loading
        })
      },
      {
        label: 'Radio Buttons',
        url: `/radio-buttons`,
        component: Loadable({
          loader: () => import('@rmwc/radio/README.md'),
          loading: Loading
        })
      },
      {
        label: 'Select Menus',
        url: `/select-menus`,
        component: Loadable({
          loader: () => import('@rmwc/select/README.md'),
          loading: Loading
        })
      },
      {
        label: 'Sliders',
        url: `/sliders`,
        component: Loadable({
          loader: () => import('@rmwc/slider/README.md'),
          loading: Loading
        })
      },
      {
        label: 'Switches',
        url: `/switches`,
        component: Loadable({
          loader: () => import('@rmwc/switch/README.md'),
          loading: Loading
        })
      },
      {
        label: 'Text Fields',
        url: `/text-fields`,
        component: Loadable({
          loader: () => import('@rmwc/textfield/README.md'),
          loading: Loading
        })
      }
    ]
  },
  {
    label: 'Layout Grid',
    url: `/layout-grid`,
    component: Loadable({
      loader: () => import('@rmwc/grid/README.md'),
      loading: Loading
    })
  },
  {
    label: 'Progress',
    options: [
      {
        label: 'Linear Progress',
        url: `/linear-progress`,
        component: Loadable({
          loader: () => import('@rmwc/linear-progress/README.md'),
          loading: Loading
        })
      },
      {
        label: 'Circular Progress',
        url: `/circular-progress`,
        component: Loadable({
          loader: () => import('@rmwc/circular-progress/README.md'),
          loading: Loading
        })
      }
    ]
  },
  {
    label: 'Lists',
    url: `/lists`,
    component: Loadable({
      loader: () => import('@rmwc/list/README.md'),
      loading: Loading
    })
  },
  {
    label: 'Menus',
    url: `/menus`,
    component: Loadable({
      loader: () => import('@rmwc/menu/README.md'),
      loading: Loading
    })
  },
  {
    label: 'Ripples',
    url: `/ripples`,
    component: Loadable({
      loader: () => import('@rmwc/ripple/README.md'),
      loading: Loading
    })
  },

  {
    label: 'Snackbars',
    url: `/snackbars`,
    component: Loadable({
      loader: () => import('@rmwc/snackbar/README.md'),
      loading: Loading
    })
  },
  {
    label: 'Tabs',
    url: `/tabs`,
    component: Loadable({
      loader: () => import('@rmwc/tabs/README.md'),
      loading: Loading
    })
  },
  {
    label: 'Theme',
    url: `/theme`,
    component: Loadable({
      loader: () => import('@rmwc/theme/README.md'),
      loading: Loading
    })
  },
  {
    label: 'Toolbars',
    url: `/toolbars`,
    component: Loadable({
      loader: () => import('@rmwc/toolbar/README.md'),
      loading: Loading
    })
  },
  {
    label: 'Top App Bar',
    url: `/top-app-bar`,
    component: Loadable({
      loader: () => import('@rmwc/top-app-bar/README.md'),
      loading: Loading
    })
  },

  {
    label: 'Typography',
    url: `/typography`,
    component: Loadable({
      loader: () => import('@rmwc/typography/README.md'),
      loading: Loading
    })
  },
  {
    label: 'Icons',
    url: `/icons`,
    component: Loadable({
      loader: () => import('@rmwc/icon/README.md'),
      loading: Loading
    })
  },
  {
    label: 'Provider',
    url: `/provider`,
    component: Loadable({
      loader: () => import('@rmwc/provider/README.md'),
      loading: Loading
    })
  }
];
