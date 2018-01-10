import InstallationDocs from './installation.md';
import UsageDocs from './usage.md';
import MethodologyDocs from './methodology.md';
import ProviderDocs from '../Provider/provider.md';
import ButtonDocs from '../Button/button.md';
import FabDocs from '../Fab/fab.md';
import IconToggleDocs from '../IconToggle/icon-toggle.md';
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

export const menuContent = [
  {
    label: 'Getting Started',
    options: [
      {
        label: 'Installation',
        url: `${process.env.PUBLIC_URL}/installation`,
        component: InstallationDocs
      },
      {
        label: 'Usage and Styling',
        url: `${process.env.PUBLIC_URL}/usage`,
        component: UsageDocs
      },
      {
        label: 'Project Methodology',
        url: `${process.env.PUBLIC_URL}/methodology`,
        component: MethodologyDocs
      }
    ]
  },
  {
    label: 'Buttons',
    options: [
      {
        label: 'Buttons',
        url: `${process.env.PUBLIC_URL}/buttons`,
        component: ButtonDocs
      },
      {
        label: 'Fabs',
        url: `${process.env.PUBLIC_URL}/fabs`,
        component: FabDocs
      },
      {
        label: 'Icon Toggles',
        url: `${process.env.PUBLIC_URL}/icon-toggles`,
        component: IconToggleDocs
      }
    ]
  },
  {
    label: 'Cards',
    url: `${process.env.PUBLIC_URL}/cards`,
    component: CardDocs
  },
  {
    label: 'Dialogs',
    url: `${process.env.PUBLIC_URL}/dialogs`,
    component: DialogDocs
  },
  {
    label: 'Drawers',
    url: `${process.env.PUBLIC_URL}/drawers`,
    component: DrawerDocs
  },
  {
    label: 'Elevation',
    url: `${process.env.PUBLIC_URL}/elevation`,
    component: ElevationDocs
  },
  {
    label: 'Grid Lists',
    url: `${process.env.PUBLIC_URL}/grid-lists`,
    component: GridListDocs
  },
  {
    label: 'Inputs and Controls',
    options: [
      {
        label: 'Checkboxes',
        url: `${process.env.PUBLIC_URL}/checkboxes`,
        component: CheckboxDocs
      },
      {
        label: 'FormFields',
        url: `${process.env.PUBLIC_URL}/form-fields`,
        component: FormFieldDocs
      },
      {
        label: 'Radio Buttons',
        url: `${process.env.PUBLIC_URL}/radio-buttons`,
        component: RadioDocs
      },
      {
        label: 'Select Menus',
        url: `${process.env.PUBLIC_URL}/select-menus`,
        component: SelectDocs
      },
      {
        label: 'Sliders',
        url: `${process.env.PUBLIC_URL}/sliders`,
        component: SliderDocs
      },
      {
        label: 'Switches',
        url: `${process.env.PUBLIC_URL}/switches`,
        component: SwitchDocs
      },
      {
        label: 'Text Fields',
        url: `${process.env.PUBLIC_URL}/text-fields`,
        component: TextFieldDocs
      }
    ]
  },
  {
    label: 'Layout Grid',
    url: `${process.env.PUBLIC_URL}/layout-grid`,
    component: GridDocs
  },
  {
    label: 'Linear Progress',
    url: `${process.env.PUBLIC_URL}/linear-progress`,
    component: LinearProgressDocs
  },
  {
    label: 'Lists',
    url: `${process.env.PUBLIC_URL}/lists`,
    component: ListDocs
  },
  {
    label: 'Menus',
    url: `${process.env.PUBLIC_URL}/menus`,
    component: MenuDocs
  },
  {
    label: 'Ripples',
    url: `${process.env.PUBLIC_URL}/ripples`,
    component: RippleDocs
  },
  {
    label: 'Snackbars',
    url: `${process.env.PUBLIC_URL}/snackbars`,
    component: SnackbarDocs
  },
  {
    label: 'Tabs',
    url: `${process.env.PUBLIC_URL}/tabs`,
    component: TabDocs
  },
  {
    label: 'Theme',
    url: `${process.env.PUBLIC_URL}/theme`,
    component: ThemeDocs
  },
  {
    label: 'Toolbars',
    url: `${process.env.PUBLIC_URL}/toolbars`,
    component: ToolbarDocs
  },
  {
    label: 'Typography',
    url: `${process.env.PUBLIC_URL}/typography`,
    component: TypographyDocs
  },
  {
    label: 'Icons',
    url: `${process.env.PUBLIC_URL}/icons`,
    component: IconDocs
  },
  {
    label: 'Provider',
    url: `${process.env.PUBLIC_URL}/provider`,
    component: ProviderDocs
  }
];
