import InstallationDocs from './installation.md';
import StylingThemingDocs from './styling-theming.md';
import UsageDocs from './usage.md';
import MethodologyDocs from './methodology.md';
import ProviderDocs from '@rmwc/provider/README.md';
import ButtonDocs from '@rmwc/button/README.md';
import FabDocs from '@rmwc/fab/README.md';
import IconButtonDocs from '@rmwc/icon-button/README.md';
import CardDocs from '@rmwc/card/README.md';
import DialogDocs from '@rmwc/dialog/README.md';
import DrawerDocs from '@rmwc/drawer/README.md';
import ElevationDocs from '@rmwc/elevation/README.md';
import GridListDocs from '@rmwc/grid-list/README.md';
import CheckboxDocs from '@rmwc/checkbox/README.md';
import FormFieldDocs from '@rmwc/form-field/README.md';
import RadioDocs from '@rmwc/radio/README.md';
import SelectDocs from '@rmwc/select/README.md';
import SliderDocs from '@rmwc/slider/README.md';
import SwitchDocs from '@rmwc/switch/README.md';
import TextFieldDocs from '@rmwc/text-field/README.md';
import GridDocs from '@rmwc/grid/README.md';
import LinearProgressDocs from '@rmwc/linear-progress/README.md';
import ListDocs from '@rmwc/list/README.md';
import MenuDocs from '@rmwc/menu/README.md';
import RippleDocs from '@rmwc/ripple/README.md';
import SnackbarDocs from '@rmwc/snackbar/README.md';
import TabDocs from '@rmwc/tabs/README.md';
import ThemeDocs from '@rmwc/theme/README.md';
import ToolbarDocs from '@rmwc/toolbar/README.md';
import TypographyDocs from '@rmwc/typography/README.md';
import IconDocs from '@rmwc/icon/README.md';
import ChipDocs from '@rmwc/chip/README.md';
import TopAppBarDocs from '@rmwc/top-app-bar/README.md';
import ShapeDocs from '@rmwc/shape/README.md';
import ImageListDocs from '@rmwc/image-list/README.md';

export const menuContent = [
  {
    label: 'Getting Started',
    options: [
      {
        label: 'Installation',
        url: `/installation`,
        component: InstallationDocs
      },
      {
        label: 'Usage',
        url: `/usage`,
        component: UsageDocs
      },
      {
        label: 'Styling and Theming',
        url: `/styling-theming`,
        component: StylingThemingDocs
      },
      {
        label: 'Project Methodology',
        url: `/methodology`,
        component: MethodologyDocs
      }
    ]
  },
  {
    label: 'Buttons',
    options: [
      {
        label: 'Buttons',
        url: `/buttons`,
        component: ButtonDocs
      },
      {
        label: 'Fabs',
        url: `/fabs`,
        component: FabDocs
      },
      {
        label: 'Icon Buttons',
        url: `/icon-buttons`,
        component: IconButtonDocs
      }
    ]
  },
  {
    label: 'Cards',
    url: `/cards`,
    component: CardDocs
  },
  {
    label: 'Chips',
    url: `/chips`,
    component: ChipDocs
  },
  {
    label: 'Dialogs',
    url: `/dialogs`,
    component: DialogDocs
  },
  {
    label: 'Drawers',
    url: `/drawers`,
    component: DrawerDocs
  },
  {
    label: 'Elevation',
    url: `/elevation`,
    component: ElevationDocs
  },
  {
    label: 'Grid Lists',
    url: `/grid-lists`,
    component: GridListDocs
  },
  {
    label: 'Image Lists',
    url: `/image-lists`,
    component: ImageListDocs
  },
  {
    label: 'Inputs and Controls',
    options: [
      {
        label: 'Checkboxes',
        url: `/checkboxes`,
        component: CheckboxDocs
      },
      {
        label: 'FormFields',
        url: `/form-fields`,
        component: FormFieldDocs
      },
      {
        label: 'Radio Buttons',
        url: `/radio-buttons`,
        component: RadioDocs
      },
      {
        label: 'Select Menus',
        url: `/select-menus`,
        component: SelectDocs
      },
      {
        label: 'Sliders',
        url: `/sliders`,
        component: SliderDocs
      },
      {
        label: 'Switches',
        url: `/switches`,
        component: SwitchDocs
      },
      {
        label: 'Text Fields',
        url: `/text-fields`,
        component: TextFieldDocs
      }
    ]
  },
  {
    label: 'Layout Grid',
    url: `/layout-grid`,
    component: GridDocs
  },
  {
    label: 'Linear Progress',
    url: `/linear-progress`,
    component: LinearProgressDocs
  },
  {
    label: 'Lists',
    url: `/lists`,
    component: ListDocs
  },
  {
    label: 'Menus',
    url: `/menus`,
    component: MenuDocs
  },
  {
    label: 'Ripples',
    url: `/ripples`,
    component: RippleDocs
  },
  {
    label: 'Shape',
    url: '/shape',
    component: ShapeDocs
  },
  {
    label: 'Snackbars',
    url: `/snackbars`,
    component: SnackbarDocs
  },
  {
    label: 'Tabs',
    url: `/tabs`,
    component: TabDocs
  },
  {
    label: 'Theme',
    url: `/theme`,
    component: ThemeDocs
  },
  {
    label: 'Toolbars',
    url: `/toolbars`,
    component: ToolbarDocs
  },
  {
    label: 'Top App Bar',
    url: `/top-app-bar`,
    component: TopAppBarDocs
  },

  {
    label: 'Typography',
    url: `/typography`,
    component: TypographyDocs
  },
  {
    label: 'Icons',
    url: `/icons`,
    component: IconDocs
  },
  {
    label: 'Provider',
    url: `/provider`,
    component: ProviderDocs
  }
];
