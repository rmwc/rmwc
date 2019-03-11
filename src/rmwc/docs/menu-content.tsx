import * as React from 'react';
import { CircularProgress } from '@rmwc/circular-progress';

const InstallationDocs = React.lazy(() => import('./README-INSTALLATION.md'));
const ResourcesDocs = React.lazy(() => import('./resources'));
const UsageDocs = React.lazy(() => import('./README-USAGE.md'));
const StylingThemingDocs = React.lazy(() =>
  import('./README-STYLING-THEMING.md')
);
const MethodologyDocs = React.lazy(() => import('./README-METHODOLOGY.md'));
const LibraryIntegrationsDocs = React.lazy(() =>
  import('./README-LIBRARY-INTEGRATIONS.md')
);

const TypeDocs = React.lazy(() => import('./README-TYPES.md'));

const AvatarDocs = React.lazy(() => import('@rmwc/avatar/README.md'));
const ButtonDocs = React.lazy(() => import('@rmwc/button/README.md'));
const FabDocs = React.lazy(() => import('@rmwc/fab/README.md'));
const IconButtonDocs = React.lazy(() => import('@rmwc/icon-button/README.md'));
const CardDocs = React.lazy(() => import('@rmwc/card/README.md'));
const ChipDocs = React.lazy(() => import('@rmwc/chip/README.md'));
const DataTableDocs = React.lazy(() => import('@rmwc/data-table/README.md'));
const DialogDocs = React.lazy(() => import('@rmwc/dialog/README.md'));
const DrawerDocs = React.lazy(() => import('@rmwc/drawer/README.md'));
const ElevationDocs = React.lazy(() => import('@rmwc/elevation/README.md'));
const GridListDocs = React.lazy(() => import('@rmwc/grid-list/README.md'));
const ImageListDocs = React.lazy(() => import('@rmwc/image-list/README.md'));
const CheckboxDocs = React.lazy(() => import('@rmwc/checkbox/README.md'));
const FormfieldDocs = React.lazy(() => import('@rmwc/formfield/README.md'));
const RadioDocs = React.lazy(() => import('@rmwc/radio/README.md'));
const SelectDocs = React.lazy(() => import('@rmwc/select/README.md'));
const SliderDocs = React.lazy(() => import('@rmwc/slider/README.md'));
const SwitchDocs = React.lazy(() => import('@rmwc/switch/README.md'));
const TextfieldDocs = React.lazy(() => import('@rmwc/textfield/README.md'));
const GridDocs = React.lazy(() => import('@rmwc/grid/README.md'));
const LinearProgressDocs = React.lazy(() =>
  import('@rmwc/linear-progress/README.md')
);
const CircularProgressDocsDocs = React.lazy(() =>
  import('@rmwc/circular-progress/README.md')
);
const ListDocs = React.lazy(() => import('@rmwc/list/README.md'));
const ListCollapsibleDocs = React.lazy(() =>
  import('@rmwc/list/README-COLLAPSIBLE.md')
);
const ListVariantsDocs = React.lazy(() =>
  import('@rmwc/list/README-VARIANTS.md')
);
const MenuDocs = React.lazy(() => import('@rmwc/menu/README.md'));
const RippleDocs = React.lazy(() => import('@rmwc/ripple/README.md'));
const SnackbarDocs = React.lazy(() => import('@rmwc/snackbar/README.md'));
const TabsDocs = React.lazy(() => import('@rmwc/tabs/README.md'));
const ThemeDocs = React.lazy(() => import('@rmwc/theme/README.md'));
const ToolbarDocs = React.lazy(() => import('@rmwc/toolbar/README.md'));
const TopAppBarDocs = React.lazy(() => import('@rmwc/top-app-bar/README.md'));
const TypographyDocs = React.lazy(() => import('@rmwc/typography/README.md'));
const IconDocs = React.lazy(() => import('@rmwc/icon/README.md'));
const ProviderDocs = React.lazy(() => import('@rmwc/provider/README.md'));

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
    <CircularProgress size="xlarge" />
  </div>
);

const Loadable = (Component: any) => () => (
  <React.Suspense fallback={<Loading />}>
    <Component />
  </React.Suspense>
);

export const menuContent = [
  {
    label: 'Getting Started',
    options: [
      {
        label: 'Installation',
        url: `/installation`,
        component: Loadable(InstallationDocs)
      },
      {
        label: 'Resources',
        url: `/resources`,
        component: Loadable(ResourcesDocs)
      },
      {
        label: 'Usage',
        url: `/usage`,
        component: Loadable(UsageDocs)
      },
      {
        label: 'Styling and Theming',
        url: `/styling-theming`,
        component: Loadable(StylingThemingDocs)
      },
      {
        label: 'Project Methodology',
        url: `/methodology`,
        component: Loadable(MethodologyDocs)
      },
      {
        label: 'Type System',
        url: `/type-system`,
        component: Loadable(TypeDocs)
      },
      {
        label: 'Library Integrations',
        url: `/library-integrations`,
        component: Loadable(LibraryIntegrationsDocs)
      }
    ]
  },
  {
    label: 'Avatars',
    url: `/avatars`,
    component: Loadable(AvatarDocs)
  },
  {
    label: 'Buttons',
    options: [
      {
        label: 'Buttons',
        url: `/buttons`,
        component: Loadable(ButtonDocs)
      },
      {
        label: 'Fabs',
        url: `/fabs`,
        component: Loadable(FabDocs)
      },
      {
        label: 'Icon Buttons',
        url: `/icon-buttons`,
        component: Loadable(IconButtonDocs)
      }
    ]
  },
  {
    label: 'Cards',
    url: `/cards`,
    component: Loadable(CardDocs)
  },
  {
    label: 'Chips',
    url: `/chips`,
    component: Loadable(ChipDocs)
  },
  {
    label: 'Data Tables',
    url: `/data-tables`,
    component: Loadable(DataTableDocs)
  },
  {
    label: 'Dialogs',
    url: `/dialogs`,
    component: Loadable(DialogDocs)
  },
  {
    label: 'Drawers',
    url: `/drawers`,
    component: Loadable(DrawerDocs)
  },
  {
    label: 'Elevation',
    url: `/elevation`,
    component: Loadable(ElevationDocs)
  },
  {
    label: 'Grid Lists',
    url: `/grid-lists`,
    component: Loadable(GridListDocs)
  },
  {
    label: 'Image Lists',
    url: `/image-lists`,
    component: Loadable(ImageListDocs)
  },
  {
    label: 'Inputs and Controls',
    options: [
      {
        label: 'Checkboxes',
        url: `/checkboxes`,
        component: Loadable(CheckboxDocs)
      },
      {
        label: 'FormFields',
        url: `/formfields`,
        component: Loadable(FormfieldDocs)
      },
      {
        label: 'Radio Buttons',
        url: `/radio-buttons`,
        component: Loadable(RadioDocs)
      },
      {
        label: 'Select Menus',
        url: `/select-menus`,
        component: Loadable(SelectDocs)
      },
      {
        label: 'Sliders',
        url: `/sliders`,
        component: Loadable(SliderDocs)
      },
      {
        label: 'Switches',
        url: `/switches`,
        component: Loadable(SwitchDocs)
      },
      {
        label: 'Text Fields',
        url: `/text-fields`,
        component: Loadable(TextfieldDocs)
      }
    ]
  },
  {
    label: 'Layout Grid',
    url: `/layout-grid`,
    component: Loadable(GridDocs)
  },
  {
    label: 'Progress',
    options: [
      {
        label: 'Linear Progress',
        url: `/linear-progress`,
        component: Loadable(LinearProgressDocs)
      },
      {
        label: 'Circular Progress',
        url: `/circular-progress`,
        component: Loadable(CircularProgressDocsDocs)
      }
    ]
  },
  {
    label: 'Lists',
    options: [
      {
        label: 'Standard Lists',
        url: `/lists`,
        component: Loadable(ListDocs)
      },
      {
        label: 'Collapsible',
        url: `/lists-collapsible`,
        component: Loadable(ListCollapsibleDocs)
      },
      {
        label: 'Variants',
        url: `/lists-variants`,
        component: Loadable(ListVariantsDocs)
      }
    ]
  },
  {
    label: 'Menus',
    url: `/menus`,
    component: Loadable(MenuDocs)
  },
  {
    label: 'Ripples',
    url: `/ripples`,
    component: Loadable(RippleDocs)
  },

  {
    label: 'Snackbars',
    url: `/snackbars`,
    component: Loadable(SnackbarDocs)
  },
  {
    label: 'Tabs',
    url: `/tabs`,
    component: Loadable(TabsDocs)
  },
  {
    label: 'Theme',
    url: `/theme`,
    component: Loadable(ThemeDocs)
  },
  {
    label: 'Toolbars',
    url: `/toolbars`,
    component: Loadable(ToolbarDocs)
  },
  {
    label: 'Top App Bar',
    url: `/top-app-bar`,
    component: Loadable(TopAppBarDocs)
  },

  {
    label: 'Typography',
    url: `/typography`,
    component: Loadable(TypographyDocs)
  },
  {
    label: 'Icons',
    url: `/icons`,
    component: Loadable(IconDocs)
  },
  {
    label: 'Provider',
    url: `/provider`,
    component: Loadable(ProviderDocs)
  }
];
