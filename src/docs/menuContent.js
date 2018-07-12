import InstallationDocs from './installation.md';
import StylingDocs from './styling.md';
import UsageDocs from './usage.md';
import MethodologyDocs from './methodology.md';
import ProviderDocs from '../Provider/provider.md';
import ButtonDocs from '../Button/button.md';
import FabDocs from '../Fab/fab.md';
import IconButtonDocs from '../IconButton/icon-button.md';
import CardDocs from '../Card/card.md';
import DialogDocs from '../Dialog/dialog.md';
import DrawerDocs from '../Drawer/drawer.md';
import ElevationDocs from '../Elevation/elevation.md';
import GridListDocs from '../GridList/grid-list.md';
import CheckboxDocs from '../Checkbox/checkbox.md';
import FormFieldDocs from '../FormField/form-field.md';
import RadioDocs from '../Radio/radio.md';
import SelectDocs from '../Select/select.md';
import SliderDocs from '../Slider/slider.md';
import SwitchDocs from '../Switch/switch.md';
import TextFieldDocs from '../TextField/textfield.md';
import GridDocs from '../Grid/grid.md';
import LinearProgressDocs from '../LinearProgress/linear-progress.md';
import ListDocs from '../List/list.md';
import MenuDocs from '../Menu/menu.md';
import RippleDocs from '../Ripple/ripple.md';
import SnackbarDocs from '../Snackbar/snackbar.md';
import TabDocs from '../Tabs/tabs.md';
import ThemeDocs from '../Theme/theme.md';
import ToolbarDocs from '../Toolbar/toolbar.md';
import TypographyDocs from '../Typography/typography.md';
import IconDocs from '../Icon/icon.md';
import ChipDocs from '../Chip/chip.md';
import TopAppBarDocs from '../TopAppBar/top-app-bar.md';
import ShapeDocs from '../Shape/shape.md';
import ImageListDocs from '../ImageList/image-list.md';

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
        label: 'Styling',
        url: `/styling`,
        component: StylingDocs
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
