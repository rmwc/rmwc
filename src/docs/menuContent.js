import InstallationDocs from './installation.md';
import StylingThemingDocs from './styling-theming.md';
import UsageDocs from './usage.md';
import MethodologyDocs from './methodology.md';
import ProviderDocs from '../Provider/README.md';
import ButtonDocs from '../Button/README.md';
import FabDocs from '../Fab/README.md';
import IconButtonDocs from '../IconButton/README.md';
import CardDocs from '../Card/README.md';
import DialogDocs from '../Dialog/README.md';
import DrawerDocs from '../Drawer/README.md';
import ElevationDocs from '../Elevation/README.md';
import GridListDocs from '../GridList/README.md';
import CheckboxDocs from '../Checkbox/README.md';
import FormFieldDocs from '../FormField/README.md';
import RadioDocs from '../Radio/README.md';
import SelectDocs from '../Select/README.md';
import SliderDocs from '../Slider/README.md';
import SwitchDocs from '../Switch/README.md';
import TextFieldDocs from '../TextField/README.md';
import GridDocs from '../Grid/README.md';
import LinearProgressDocs from '../LinearProgress/README.md';
import ListDocs from '../List/README.md';
import MenuDocs from '../Menu/README.md';
import RippleDocs from '../Ripple/README.md';
import SnackbarDocs from '../Snackbar/README.md';
import TabDocs from '../Tabs/README.md';
import ThemeDocs from '../Theme/README.md';
import ToolbarDocs from '../Toolbar/README.md';
import TypographyDocs from '../Typography/README.md';
import IconDocs from '../Icon/README.md';
import ChipDocs from '../Chip/README.md';
import TopAppBarDocs from '../TopAppBar/README.md';
import ShapeDocs from '../Shape/README.md';
import ImageListDocs from '../ImageList/README.md';

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
