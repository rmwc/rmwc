import { CircularProgress } from '@rmwc/circular-progress';
import { DocsMarkdown } from '@rmwc/doc-utils';
import React from 'react';

import InstallationMD from '../markdown/README-INSTALLATION.md';
import LibraryIntegrationsMD from '../markdown/README-LIBRARY-INTEGRATIONS.md';
import MethodologyMD from '../markdown/README-METHODOLOGY.md';
import StylingMD from '../markdown/README-STYLING-THEMING.md';
import TypesMD from '../markdown/README-TYPES.md';
import UsageMD from '../markdown/README-USAGE.md';

import {
  avatar,
  badge,
  base,
  button,
  card,
  checkbox,
  chip,
  circularProgress,
  dataTable,
  dialog,
  drawer,
  elevation,
  fab,
  formfield,
  grid,
  gridList,
  icon,
  iconButton,
  imageList,
  linearProgress,
  list,
  listCollapsible,
  listVariants,
  menu,
  provider,
  radio,
  ripple,
  segmentedButton,
  select,
  slider,
  snackbar,
  switchControl,
  tabs,
  textfield,
  theme,
  tooltip,
  rcTooltip,
  topAppBar,
  typography
} from '@rmwc/readme';

const InstallationDocs = () => <DocsMarkdown fileSrc={InstallationMD} />;
const UsageDocs = () => <DocsMarkdown fileSrc={UsageMD} />;
const StylingThemingDocs = () => <DocsMarkdown fileSrc={StylingMD} />;
const MethodologyDocs = () => <DocsMarkdown fileSrc={MethodologyMD} />;
const LibraryIntegrationsDocs = () => (
  <DocsMarkdown fileSrc={LibraryIntegrationsMD} />
);
const TypeDocs = () => <DocsMarkdown fileSrc={TypesMD} />;

const ResourcesDocs = React.lazy(() => import('../views/resources'));

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
    <CircularProgress size="large" />
  </div>
);

const Loadable = (Component: any) => () => (
  <React.Suspense fallback={<Loading />}>
    <Component />
  </React.Suspense>
);

export type MenuItemT = {
  label: string;
  url?: string;
  gallery?: React.ReactNode;
  component?: () => JSX.Element;
  options?: MenuItemT[];
};

export const menuContent: MenuItemT[] = [
  {
    label: 'Getting Started',
    options: [
      {
        label: 'Installation',
        url: `/installation`,
        component: Loadable(InstallationDocs)
      },
      {
        label: 'Basic Usage',
        url: `/usage`,
        component: Loadable(UsageDocs)
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
    label: 'Style and Theming',
    url: `/styling-theming`,
    component: Loadable(StylingThemingDocs)
  },
  {
    label: 'Resources',
    url: `/resources`,
    component: Loadable(ResourcesDocs)
  },
  {
    label: 'Components',
    options: [
      {
        label: 'Avatars',
        url: `/avatars`,
        gallery: avatar.galleryExample,
        component: Loadable(avatar.default)
      },
      {
        label: 'Badges',
        url: `/badges`,
        gallery: badge.galleryExample,
        component: Loadable(badge.default)
      },
      {
        label: 'Buttons',
        options: [
          {
            label: 'Buttons',
            url: `/buttons`,
            gallery: button.galleryExample,
            component: Loadable(button.default)
          },
          {
            label: 'Fabs',
            url: `/fabs`,
            gallery: fab.galleryExample,
            component: Loadable(fab.default)
          },
          {
            label: 'Icon Buttons',
            url: `/icon-buttons`,
            gallery: iconButton.galleryExample,
            component: Loadable(iconButton.default)
          },
          {
            label: 'Segmented Button',
            url: `/segmented-button`,
            gallery: segmentedButton.galleryExample,
            component: Loadable(segmentedButton.default)
          }
        ]
      },
      {
        label: 'Cards',
        url: `/cards`,
        gallery: card.galleryExample,
        component: Loadable(card.default)
      },
      {
        label: 'Chips',
        url: `/chips`,
        gallery: chip.galleryExample,
        component: Loadable(chip.default)
      },
      {
        label: 'Data Tables',
        url: `/data-tables`,
        gallery: dataTable.galleryExample,
        component: Loadable(dataTable.default)
      },
      {
        label: 'Dialogs',
        url: `/dialogs`,
        gallery: dialog.galleryExample,
        component: Loadable(dialog.default)
      },
      {
        label: 'Drawers',
        url: `/drawers`,
        gallery: drawer.galleryExample,
        component: Loadable(drawer.default)
      },
      {
        label: 'Elevation',
        url: `/elevation`,
        gallery: elevation.galleryExample,
        component: Loadable(elevation.default)
      },
      {
        label: 'Grids',
        options: [
          {
            label: 'Layout Grid',
            url: `/layout-grid`,
            gallery: grid.galleryExample,
            component: Loadable(grid.default)
          },
          {
            label: 'Image Lists',
            url: `/image-lists`,
            gallery: imageList.galleryExample,
            component: Loadable(imageList.default)
          },
          {
            label: 'Grid Lists',
            url: `/grid-lists`,
            gallery: gridList.galleryExample,
            component: Loadable(gridList.default)
          }
        ]
      },

      {
        label: 'Inputs and Controls',
        options: [
          {
            label: 'Checkboxes',
            url: `/checkboxes`,
            gallery: checkbox.galleryExample,
            component: Loadable(checkbox.default)
          },
          {
            label: 'FormFields',
            url: `/formfields`,
            component: Loadable(formfield.default)
          },
          {
            label: 'Radio Buttons',
            url: `/radio-buttons`,
            gallery: radio.galleryExample,
            component: Loadable(radio.default)
          },
          {
            label: 'Select Menus',
            url: `/select-menus`,
            gallery: select.galleryExample,
            component: Loadable(select.default)
          },
          {
            label: 'Sliders',
            url: `/sliders`,
            gallery: slider.galleryExample,
            component: Loadable(slider.default)
          },
          {
            label: 'Switches',
            url: `/switches`,
            gallery: switchControl.galleryExample,
            component: Loadable(switchControl.default)
          },
          {
            label: 'Text Fields',
            url: `/text-fields`,
            gallery: textfield.galleryExample,
            component: Loadable(textfield.default)
          }
        ]
      },

      {
        label: 'Progress',
        options: [
          {
            label: 'Linear Progress',
            url: `/linear-progress`,
            gallery: linearProgress.galleryExample,
            component: Loadable(linearProgress.default)
          },
          {
            label: 'Circular Progress',
            url: `/circular-progress`,
            gallery: circularProgress.galleryExample,
            component: Loadable(circularProgress.default)
          }
        ]
      },
      {
        label: 'Lists',
        options: [
          {
            label: 'Lists',
            url: `/lists`,
            gallery: list.galleryExample,
            component: Loadable(list.default)
          },
          {
            label: 'Collapsible',
            url: `/lists-collapsible`,
            component: Loadable(listCollapsible.default)
          },
          {
            label: 'Variants',
            url: `/lists-variants`,
            component: Loadable(listVariants.default)
          }
        ]
      },
      {
        label: 'Menus',
        url: `/menus`,
        gallery: menu.galleryExample,
        component: Loadable(menu.default)
      },
      {
        label: 'Ripples',
        url: `/ripples`,
        gallery: ripple.galleryExample,
        component: Loadable(ripple.default)
      },

      {
        label: 'Snackbars',
        url: `/snackbars`,
        gallery: snackbar.galleryExample,
        component: Loadable(snackbar.default)
      },
      {
        label: 'Tabs',
        url: `/tabs`,
        gallery: tabs.galleryExample,
        component: Loadable(tabs.default)
      },
      {
        label: 'Theme',
        url: `/theme`,
        gallery: theme.galleryExample,
        component: Loadable(theme.default)
      },
      {
        label: 'Tooltips',
        options: [
          {
            label: 'Tooltips',
            url: `/tooltips`,
            gallery: tooltip.galleryExample,
            component: Loadable(tooltip.default)
          },
          {
            label: 'RC Tooltips',
            url: `/rc-tooltips`,
            gallery: rcTooltip.galleryExample,
            component: Loadable(rcTooltip.default)
          }
        ]
      },
      {
        label: 'Top App Bar',
        url: `/top-app-bar`,
        gallery: topAppBar.galleryExample,
        component: Loadable(topAppBar.default)
      },
      {
        label: 'Typography',
        url: `/typography`,
        gallery: typography.galleryExample,
        component: Loadable(typography.default)
      },
      {
        label: 'Icons',
        url: `/icons`,
        gallery: icon.galleryExample,
        component: Loadable(icon.default)
      },
      {
        label: 'Provider',
        url: `/provider`,
        component: Loadable(provider.default)
      },
      {
        label: 'Portal',
        url: `/portal`,
        component: Loadable(base.default)
      }
    ]
  }
];

export const galleryContent = menuContent
  .reduce<MenuItemT[]>((acc, item) => {
    if ('options' in item) {
      acc.push(...(item.options || []));
    } else {
      acc.push(item as MenuItemT);
    }

    return acc;
  }, [])
  .filter((item) => !!item.gallery);
